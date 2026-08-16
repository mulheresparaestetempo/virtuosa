import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FirebaseMessagingService {
  final FirebaseMessaging _firebaseMessaging;

  FirebaseMessagingService(this._firebaseMessaging);

  /// Initialize Firebase Messaging
  Future<void> initialize() async {
    try {
      // Request permission
      final NotificationSettings settings =
          await _firebaseMessaging.requestPermission(
        alert: true,
        announcement: false,
        badge: true,
        carryForward: true,
        criticalAlert: false,
        provisional: false,
        sound: true,
      );

      debugPrint('User granted permission: ${settings.authorizationStatus}');

      // Handle foreground messages
      FirebaseMessaging.onMessage.listen((RemoteMessage message) {
        debugPrint('Message received in foreground:');
        debugPrint('Title: ${message.notification?.title}');
        debugPrint('Body: ${message.notification?.body}');

        // Handle foreground notification
        _handleForegroundMessage(message);
      });

      // Handle background message
      FirebaseMessaging.onBackgroundMessage(_handleBackgroundMessage);

      // Handle message when app is terminated
      final initialMessage =
          await _firebaseMessaging.getInitialMessage();
      if (initialMessage != null) {
        _handleMessageClick(initialMessage);
      }

      // Listen to notification tap
      FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
        debugPrint('Message opened app');
        _handleMessageClick(message);
      });

      debugPrint('Firebase Messaging initialized');
    } catch (e) {
      debugPrint('Error initializing Firebase Messaging: $e');
    }
  }

  /// Get FCM token for the device
  Future<String?> getToken() async {
    try {
      final token = await _firebaseMessaging.getToken();
      debugPrint('FCM Token: $token');
      return token;
    } catch (e) {
      debugPrint('Error getting FCM token: $e');
      return null;
    }
  }

  /// Subscribe to topic
  Future<void> subscribeToTopic(String topic) async {
    try {
      await _firebaseMessaging.subscribeToTopic(topic);
      debugPrint('Subscribed to topic: $topic');
    } catch (e) {
      debugPrint('Error subscribing to topic: $e');
    }
  }

  /// Unsubscribe from topic
  Future<void> unsubscribeFromTopic(String topic) async {
    try {
      await _firebaseMessaging.unsubscribeFromTopic(topic);
      debugPrint('Unsubscribed from topic: $topic');
    } catch (e) {
      debugPrint('Error unsubscribing from topic: $e');
    }
  }

  /// Handle foreground message
  void _handleForegroundMessage(RemoteMessage message) {
    final notification = message.notification;
    final android = message.notification?.android;

    if (notification != null) {
      debugPrint('Notification:');
      debugPrint('  Title: ${notification.title}');
      debugPrint('  Body: ${notification.body}');

      // Show local notification
      // This would typically be handled by a local notifications package
    }

    if (message.data.isNotEmpty) {
      debugPrint('Message data: ${message.data}');
      _handleMessageData(message.data);
    }
  }

  /// Handle background message
  static Future<void> _handleBackgroundMessage(RemoteMessage message) async {
    debugPrint('Handling background message');
    debugPrint('Title: ${message.notification?.title}');
    debugPrint('Body: ${message.notification?.body}');
  }

  /// Handle message click
  void _handleMessageClick(RemoteMessage message) {
    debugPrint('Message clicked');
    final data = message.data;

    if (data.containsKey('type')) {
      switch (data['type']) {
        case 'devocional':
          // Navigate to devotional screen
          debugPrint('Navigate to devotional');
          break;
        case 'oracao':
          // Navigate to prayer screen
          debugPrint('Navigate to prayer');
          break;
        case 'evento':
          // Navigate to event screen
          debugPrint('Navigate to event');
          break;
        default:
          debugPrint('Unknown notification type');
      }
    }
  }

  /// Handle message data
  void _handleMessageData(Map<String, dynamic> data) {
    debugPrint('Processing message data: $data');
    // Process custom data from notification
  }

  /// Subscribe to notification topics based on user role
  Future<void> subscribeToRoleTopics(String role) async {
    // All users
    await subscribeToTopic('all_users');

    switch (role) {
      case 'usuario':
        await subscribeToTopic('usuarios');
        break;
      case 'discipuladora':
        await subscribeToTopic('usuarios');
        await subscribeToTopic('liders');
        break;
      case 'lider':
        await subscribeToTopic('usuarios');
        await subscribeToTopic('liders');
        break;
      case 'pastora':
        await subscribeToTopic('usuarios');
        await subscribeToTopic('liders');
        await subscribeToTopic('pastoras');
        break;
      case 'administradora':
        await subscribeToTopic('usuarios');
        await subscribeToTopic('liders');
        await subscribeToTopic('pastoras');
        await subscribeToTopic('administradores');
        break;
    }
  }

  /// Unsubscribe from all topics
  Future<void> unsubscribeFromAll(String currentRole) async {
    await unsubscribeFromTopic('all_users');

    switch (currentRole) {
      case 'usuario':
        await unsubscribeFromTopic('usuarios');
        break;
      case 'discipuladora':
        await unsubscribeFromTopic('usuarios');
        await unsubscribeFromTopic('liders');
        break;
      case 'lider':
        await unsubscribeFromTopic('usuarios');
        await unsubscribeFromTopic('liders');
        break;
      case 'pastora':
        await unsubscribeFromTopic('usuarios');
        await unsubscribeFromTopic('liders');
        await unsubscribeFromTopic('pastoras');
        break;
      case 'administradora':
        await unsubscribeFromTopic('usuarios');
        await unsubscribeFromTopic('liders');
        await unsubscribeFromTopic('pastoras');
        await unsubscribeFromTopic('administradores');
        break;
    }
  }
}

/// Riverpod provider
final firebaseMessagingServiceProvider = Provider((ref) {
  return FirebaseMessagingService(FirebaseMessaging.instance);
});

/// Notification topics for different content types
final notificationTopics = {
  'devotional': 'devocional_disponivel',
  'prayer_time': 'hora_oracao',
  'fasting_time': 'hora_jejum',
  'event': 'novo_evento',
  'congress': 'congresso',
  'leader_message': 'mensagem_lider',
  'prayer_answered': 'oracao_respondida',
  'new_course': 'novo_curso',
  'new_testimony': 'novo_testemunho',
  'new_journey': 'nova_jornada',
};
