import 'package:firebase_remote_config/firebase_remote_config.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class RemoteConfigService {
  final FirebaseRemoteConfig _remoteConfig;

  RemoteConfigService(this._remoteConfig);

  /// Initialize Remote Config with default values
  Future<void> initialize() async {
    try {
      await _remoteConfig.setConfigSettings(
        RemoteConfigSettings(
          fetchTimeout: const Duration(seconds: 10),
          minimumFetchInterval: const Duration(minutes: 5),
        ),
      );

      // Set default values
      await _remoteConfig.setDefaults(_defaultConfig);

      // Fetch and activate
      await fetchAndActivate();

      debugPrint('Remote Config initialized');
    } catch (e) {
      debugPrint('Error initializing Remote Config: $e');
    }
  }

  /// Fetch and activate remote config
  Future<bool> fetchAndActivate() async {
    try {
      final updated = await _remoteConfig.fetchAndActivate();
      debugPrint('Remote Config fetched and activated: $updated');
      return updated;
    } catch (e) {
      debugPrint('Error fetching Remote Config: $e');
      return false;
    }
  }

  /// Check if feature is enabled
  bool isFeatureEnabled(String featureName) {
    try {
      return _remoteConfig.getBool('feature_$featureName');
    } catch (e) {
      debugPrint('Error checking feature $featureName: $e');
      return false;
    }
  }

  /// Get string configuration
  String getStringConfig(String key, {String defaultValue = ''}) {
    try {
      return _remoteConfig.getString(key);
    } catch (e) {
      debugPrint('Error getting string config $key: $e');
      return defaultValue;
    }
  }

  /// Get integer configuration
  int getIntConfig(String key, {int defaultValue = 0}) {
    try {
      return _remoteConfig.getInt(key);
    } catch (e) {
      debugPrint('Error getting int config $key: $e');
      return defaultValue;
    }
  }

  /// Get double configuration
  double getDoubleConfig(String key, {double defaultValue = 0.0}) {
    try {
      return _remoteConfig.getDouble(key);
    } catch (e) {
      debugPrint('Error getting double config $key: $e');
      return defaultValue;
    }
  }

  /// Get boolean configuration
  bool getBoolConfig(String key, {bool defaultValue = false}) {
    try {
      return _remoteConfig.getBool(key);
    } catch (e) {
      debugPrint('Error getting bool config $key: $e');
      return defaultValue;
    }
  }

  /// All feature flags
  Map<String, bool> getAllFeatures() {
    return {
      'feature_biometry': isFeatureEnabled('biometry'),
      'feature_community': isFeatureEnabled('community'),
      'feature_ai_assistant': isFeatureEnabled('ai_assistant'),
      'feature_events': isFeatureEnabled('events'),
      'feature_leader_panel': isFeatureEnabled('leader_panel'),
      'feature_admin_panel': isFeatureEnabled('admin_panel'),
      'feature_premium': isFeatureEnabled('premium'),
      'feature_offline_sync': isFeatureEnabled('offline_sync'),
      'feature_audio': isFeatureEnabled('audio'),
      'feature_video': isFeatureEnabled('video'),
    };
  }

  /// Get theme configuration
  Map<String, dynamic> getThemeConfig() {
    return {
      'primary_color': getStringConfig('theme_primary_color', defaultValue: '#C41E3A'),
      'secondary_color':
          getStringConfig('theme_secondary_color', defaultValue: '#F0C674'),
      'tertiary_color': getStringConfig('theme_tertiary_color', defaultValue: '#D4A5A5'),
    };
  }

  /// Get app version info
  Map<String, String> getVersionInfo() {
    return {
      'current_version': getStringConfig('app_version', defaultValue: '1.0.0'),
      'minimum_version': getStringConfig('app_minimum_version', defaultValue: '1.0.0'),
      'latest_version': getStringConfig('app_latest_version', defaultValue: '1.0.0'),
    };
  }

  /// Check if update is required
  bool isUpdateRequired(String currentVersion) {
    final minimumVersion = getStringConfig('app_minimum_version', defaultValue: '1.0.0');
    return _compareVersions(currentVersion, minimumVersion) < 0;
  }

  /// Get maintenance status
  Map<String, dynamic> getMaintenanceStatus() {
    return {
      'is_under_maintenance': getBoolConfig('maintenance_enabled', defaultValue: false),
      'maintenance_message': getStringConfig('maintenance_message', defaultValue: ''),
      'estimated_time': getStringConfig('maintenance_end_time', defaultValue: ''),
    };
  }

  /// Get promotion configuration
  Map<String, dynamic> getPromotion() {
    return {
      'is_active': getBoolConfig('promotion_active', defaultValue: false),
      'title': getStringConfig('promotion_title', defaultValue: ''),
      'description': getStringConfig('promotion_description', defaultValue: ''),
      'discount': getDoubleConfig('promotion_discount', defaultValue: 0.0),
      'start_date': getStringConfig('promotion_start_date', defaultValue: ''),
      'end_date': getStringConfig('promotion_end_date', defaultValue: ''),
    };
  }

  /// Get event configuration
  Map<String, dynamic> getEventConfig() {
    return {
      'is_active': getBoolConfig('event_active', defaultValue: false),
      'title': getStringConfig('event_title', defaultValue: ''),
      'description': getStringConfig('event_description', defaultValue: ''),
      'date': getStringConfig('event_date', defaultValue: ''),
      'image_url': getStringConfig('event_image_url', defaultValue: ''),
    };
  }

  /// Compare versions (returns -1 if v1 < v2, 0 if equal, 1 if v1 > v2)
  int _compareVersions(String version1, String version2) {
    final parts1 = version1.split('.').map(int.parse).toList();
    final parts2 = version2.split('.').map(int.parse).toList();

    for (int i = 0; i < 3; i++) {
      final v1 = i < parts1.length ? parts1[i] : 0;
      final v2 = i < parts2.length ? parts2[i] : 0;

      if (v1 < v2) return -1;
      if (v1 > v2) return 1;
    }
    return 0;
  }
}

/// Default Remote Config values
const Map<String, dynamic> _defaultConfig = {
  // Feature flags
  'feature_biometry': true,
  'feature_community': true,
  'feature_ai_assistant': true,
  'feature_events': true,
  'feature_leader_panel': true,
  'feature_admin_panel': true,
  'feature_premium': false,
  'feature_offline_sync': true,
  'feature_audio': true,
  'feature_video': true,

  // Theme
  'theme_primary_color': '#C41E3A',
  'theme_secondary_color': '#F0C674',
  'theme_tertiary_color': '#D4A5A5',

  // Version
  'app_version': '1.0.0',
  'app_minimum_version': '1.0.0',
  'app_latest_version': '1.0.0',

  // Maintenance
  'maintenance_enabled': false,
  'maintenance_message': 'App em manutenção. Por favor, tente novamente mais tarde.',
  'maintenance_end_time': '',

  // Promotion
  'promotion_active': false,
  'promotion_title': '',
  'promotion_description': '',
  'promotion_discount': 0.0,
  'promotion_start_date': '',
  'promotion_end_date': '',

  // Event
  'event_active': false,
  'event_title': '',
  'event_description': '',
  'event_date': '',
  'event_image_url': '',

  // General
  'max_upload_size': 10485760, // 10MB
  'api_timeout': 30,
  'cache_duration': 3600,
};

/// Riverpod provider
final remoteConfigServiceProvider = Provider((ref) {
  return RemoteConfigService(FirebaseRemoteConfig.instance);
});

/// Watch feature flag changes
final featureEnabledProvider =
    FutureProvider.family<bool, String>((ref, featureName) async {
      final remoteConfig = ref.watch(remoteConfigServiceProvider);
      return remoteConfig.isFeatureEnabled(featureName);
    });

/// Watch all features
final allFeaturesProvider = FutureProvider<Map<String, bool>>((ref) async {
  final remoteConfig = ref.watch(remoteConfigServiceProvider);
  return remoteConfig.getAllFeatures();
});

/// Watch maintenance status
final maintenanceStatusProvider =
    FutureProvider<Map<String, dynamic>>((ref) async {
      final remoteConfig = ref.watch(remoteConfigServiceProvider);
      return remoteConfig.getMaintenanceStatus();
    });

/// Watch promotion
final promotionProvider = FutureProvider<Map<String, dynamic>>((ref) async {
  final remoteConfig = ref.watch(remoteConfigServiceProvider);
  return remoteConfig.getPromotion();
});
