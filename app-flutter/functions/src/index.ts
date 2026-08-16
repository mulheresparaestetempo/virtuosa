import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FIREBASE_EMAIL,
    pass: process.env.FIREBASE_EMAIL_PASSWORD,
  },
});

// ==========================================
// 1. CRIAR DEVOCIONAL DIÁRIO
// ==========================================
export const createDailyDevotional = functions
  .region('south-america-east1')
  .pubsub.schedule('every day 06:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      const devotionalRef = db.collection('daily_letters').doc();

      // In production, this would fetch from an API or database
      const devotional = {
        id: devotionalRef.id,
        titulo: 'Devocional do Dia',
        mensagem: 'Mensagem devocional...',
        versiculo: 'Salmos 23:1',
        imagem: 'https://...',
        audio: 'https://...',
        data: admin.firestore.FieldValue.serverTimestamp(),
      };

      await devotionalRef.set(devotional);

      // Send notification to all users
      await sendNotificationToAll('Novo Devocional', 'Novo devocional disponível!', {
        type: 'devotional',
      });

      console.log('Daily devotional created successfully');
      return { success: true };
    } catch (error) {
      console.error('Error creating daily devotional:', error);
      throw error;
    }
  });

// ==========================================
// 2. CRIAR VERSÍCULO DO DIA
// ==========================================
export const createDailyVerse = functions
  .region('south-america-east1')
  .pubsub.schedule('every day 07:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      const verses = [
        { reference: 'Salmos 23:1', text: 'O Senhor é meu pastor...' },
        { reference: 'João 3:16', text: 'Porque Deus amou o mundo...' },
        { reference: 'Filipenses 4:13', text: 'Posso todas as coisas...' },
      ];

      const dailyVerse = verses[Math.floor(Math.random() * verses.length)];

      await db.collection('daily_verses').doc(new Date().toISOString().split('T')[0]).set(
        {
          ...dailyVerse,
          data: admin.firestore.FieldValue.serverTimestamp(),
        }
      );

      console.log('Daily verse created successfully');
      return { success: true };
    } catch (error) {
      console.error('Error creating daily verse:', error);
      throw error;
    }
  });

// ==========================================
// 3. ENVIAR NOTIFICAÇÕES DE ORAÇÃO
// ==========================================
export const sendPrayerReminders = functions
  .region('south-america-east1')
  .pubsub.schedule('every day 10:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      const usersSnapshot = await db
        .collection('users')
        .where('status', '==', 'ativo')
        .get();

      const batch = db.batch();

      for (const userDoc of usersSnapshot.docs) {
        const notificationRef = db.collection('notifications').doc();
        batch.set(notificationRef, {
          userId: userDoc.id,
          titulo: 'Hora da Oração',
          mensagem: 'Que tal dedicar um tempo para oração agora?',
          tipo: 'Oracao',
          lida: false,
          data: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      await batch.commit();
      console.log('Prayer reminders sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending prayer reminders:', error);
      throw error;
    }
  });

// ==========================================
// 4. ENVIAR NOTIFICAÇÕES DE JEJUM
// ==========================================
export const sendFastingReminders = functions
  .region('south-america-east1')
  .pubsub.schedule('every day 07:30')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      const fastingsSnapshot = await db
        .collection('fastings')
        .where('status', '==', 'ativo')
        .where('inicio', '<=', new Date())
        .where('fim', '>=', new Date())
        .get();

      const batch = db.batch();

      for (const fastingDoc of fastingsSnapshot.docs) {
        const fasting = fastingDoc.data();
        const notificationRef = db.collection('notifications').doc();

        batch.set(notificationRef, {
          userId: fasting.userId,
          titulo: 'Hora do Jejum',
          mensagem: `Você está em jejum: ${fasting.titulo}`,
          tipo: 'Jejum',
          lida: false,
          data: admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      await batch.commit();
      console.log('Fasting reminders sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending fasting reminders:', error);
      throw error;
    }
  });

// ==========================================
// 5. BACKUP DIÁRIO
// ==========================================
export const dailyBackup = functions
  .region('south-america-east1')
  .pubsub.schedule('every day 02:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    try {
      const backupRef = db.collection('backups').doc(new Date().toISOString());

      // In production, backup all important collections
      const collections = ['users', 'prayers', 'journals', 'fastings'];
      const backupData: any = {};

      for (const collection of collections) {
        const snapshot = await db.collection(collection).get();
        backupData[collection] = snapshot.size;
      }

      await backupRef.set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        ...backupData,
      });

      console.log('Daily backup completed successfully');
      return { success: true };
    } catch (error) {
      console.error('Error creating backup:', error);
      throw error;
    }
  });

// ==========================================
// 6. CRIAR NOVA USUÁRIA - WELCOME EMAIL
// ==========================================
export const onUserCreated = functions
  .region('south-america-east1')
  .auth.user()
  .onCreate(async (user) => {
    try {
      // Send welcome email
      await transporter.sendMail({
        from: process.env.FIREBASE_EMAIL,
        to: user.email || '',
        subject: 'Bem-vinda à Abba Virtuosa',
        html: `
          <h1>Bem-vinda, ${user.displayName || 'Irmã'}!</h1>
          <p>Obrigada por se cadastrar na Abba Virtuosa.</p>
          <p>Convidamos você a começar sua jornada espiritual conosco.</p>
        `,
      });

      // Create user profile
      await db.collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        nome: user.displayName || '',
        fotoPerfil: user.photoURL,
        status: 'ativo',
        nivelJornada: 'iniciante',
        criadoEm: admin.firestore.FieldValue.serverTimestamp(),
        atualizadoEm: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Welcome email sent to ${user.email}`);
      return { success: true };
    } catch (error) {
      console.error('Error on user creation:', error);
      throw error;
    }
  });

// ==========================================
// 7. HELPER: SEND NOTIFICATION TO ALL USERS
// ==========================================
async function sendNotificationToAll(
  titulo: string,
  mensagem: string,
  data: any
) {
  try {
    const usersSnapshot = await db.collection('users').get();
    const batch = db.batch();

    for (const userDoc of usersSnapshot.docs) {
      const notificationRef = db.collection('notifications').doc();
      batch.set(notificationRef, {
        userId: userDoc.id,
        titulo,
        mensagem,
        tipo: data.type || 'Geral',
        lida: false,
        data: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
}

// ==========================================
// 8. CALLABLE FUNCTION: AI BIBLE ASSISTANT
// ==========================================
export const askBibleAssistant = functions
  .region('south-america-east1')
  .https.onCall(async (data, context) => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'unauthenticated',
          'User must be authenticated'
        );
      }

      const { pergunta } = data;
      const userId = context.auth.uid;

      // In production, integrate with OpenAI or Claude API
      const resposta = `Baseado na Bíblia, sobre "${pergunta}"...`;
      const versiculos = ['Salmos 23:1', 'João 3:16'];

      // Save to history
      const historyRef = db.collection('ai_history').doc();
      await historyRef.set({
        id: historyRef.id,
        userId,
        pergunta,
        resposta,
        versiculos,
        modelo: 'claude-3-sonnet',
        tokens: Math.floor(Math.random() * 500) + 100,
        criadoEm: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        success: true,
        resposta,
        versiculos,
      };
    } catch (error) {
      console.error('Error in Bible assistant:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error processing request'
      );
    }
  });

// ==========================================
// 9. GENERATE REPORT
// ==========================================
export const generateReport = functions
  .region('south-america-east1')
  .https.onCall(async (data, context) => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'unauthenticated',
          'User must be authenticated'
        );
      }

      const { type } = data;
      const userId = context.auth.uid;

      // Generate report based on type
      let reportData = {};

      if (type === 'prayers') {
        const prayersSnapshot = await db
          .collection('prayers')
          .where('userId', '==', userId)
          .get();
        reportData = {
          totalPrayers: prayersSnapshot.size,
          answered: prayersSnapshot.docs.filter(
            (doc) => doc.data().status === 'respondida'
          ).length,
        };
      }

      return {
        success: true,
        report: reportData,
      };
    } catch (error) {
      console.error('Error generating report:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error generating report'
      );
    }
  });
