import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../features/auth/domain/entities/auth_entity.dart';

/// Role-Based Access Control Service
/// Manages permissions for different user roles
class RBACService {
  /// Check if user has a specific permission
  static bool hasPermission(UserRole role, String permission) {
    final permissions = _rolePermissions[role] ?? {};
    return permissions.contains(permission);
  }

  /// Check if user can perform action
  static bool canPerformAction(UserRole role, String action) {
    final actions = _roleActions[role] ?? [];
    return actions.contains(action);
  }

  /// Get all permissions for a role
  static Set<String> getPermissions(UserRole role) {
    return _rolePermissions[role] ?? {};
  }

  /// Get all actions for a role
  static List<String> getActions(UserRole role) {
    return _roleActions[role] ?? [];
  }

  /// Check if role is admin or above
  static bool isAdmin(UserRole role) {
    return role == UserRole.administradora ||
        role == UserRole.superAdministradora;
  }

  /// Check if role is leader or above
  static bool isLeader(UserRole role) {
    return role == UserRole.lider ||
        role == UserRole.pastora ||
        role == UserRole.administradora ||
        role == UserRole.superAdministradora;
  }

  /// Check if role can manage disciples
  static bool canManageDisciplines(UserRole role) {
    return role == UserRole.discipuladora ||
        role == UserRole.lider ||
        role == UserRole.pastora ||
        role == UserRole.administradora ||
        role == UserRole.superAdministradora;
  }
}

/// Permission definitions per role
final Map<UserRole, Set<String>> _rolePermissions = {
  UserRole.usuario: {
    'read:devotional',
    'read:community',
    'read:library',
    'write:prayer',
    'write:journal',
    'write:fasting',
    'write:testimony',
  },
  UserRole.discipuladora: {
    'read:devotional',
    'read:community',
    'read:library',
    'write:prayer',
    'write:journal',
    'write:fasting',
    'write:testimony',
    'read:disciples',
    'manage:disciples',
    'send:message',
    'send:devotional',
    'read:analytics_self',
  },
  UserRole.lider: {
    'read:devotional',
    'read:community',
    'read:library',
    'write:prayer',
    'write:journal',
    'write:fasting',
    'write:testimony',
    'read:disciples',
    'manage:disciples',
    'send:message',
    'send:devotional',
    'manage:events',
    'manage:courses',
    'read:analytics',
    'manage:discipuladoras',
  },
  UserRole.pastora: {
    'read:devotional',
    'read:community',
    'read:library',
    'write:prayer',
    'write:journal',
    'write:fasting',
    'write:testimony',
    'read:disciples',
    'manage:disciples',
    'send:message',
    'send:devotional',
    'manage:events',
    'manage:courses',
    'read:analytics',
    'manage:discipuladoras',
    'manage:leaders',
    'manage:church',
    'read:financial',
  },
  UserRole.administradora: {
    'manage:users',
    'manage:churches',
    'manage:leaders',
    'manage:devotional',
    'manage:courses',
    'manage:events',
    'manage:community',
    'read:analytics',
    'manage:ai',
    'manage:permissions',
    'read:financial',
    'manage:settings',
  },
  UserRole.superAdministradora: {
    'manage:all',
    'read:all',
    'write:all',
    'delete:all',
  },
};

/// Actions per role
final Map<UserRole, List<String>> _roleActions = {
  UserRole.usuario: [
    'view_home',
    'view_devotional',
    'create_prayer',
    'create_journal',
    'create_fasting',
    'view_community',
    'create_testimony',
  ],
  UserRole.discipuladora: [
    'view_home',
    'view_devotional',
    'create_prayer',
    'create_journal',
    'create_fasting',
    'view_community',
    'create_testimony',
    'view_disciples',
    'manage_disciples',
    'send_message',
    'send_devotional',
    'view_reports',
    'access_leader_panel',
  ],
  UserRole.lider: [
    'view_home',
    'view_devotional',
    'create_prayer',
    'create_journal',
    'create_fasting',
    'view_community',
    'create_testimony',
    'view_disciples',
    'manage_disciples',
    'send_message',
    'send_devotional',
    'manage_events',
    'manage_courses',
    'view_reports',
    'manage_discipuladoras',
    'access_leader_panel',
  ],
  UserRole.pastora: [
    'view_home',
    'view_devotional',
    'create_prayer',
    'create_journal',
    'create_fasting',
    'view_community',
    'create_testimony',
    'view_disciples',
    'manage_disciples',
    'send_message',
    'send_devotional',
    'manage_events',
    'manage_courses',
    'view_reports',
    'manage_discipuladoras',
    'manage_leaders',
    'manage_church',
    'view_financial',
    'access_leader_panel',
  ],
  UserRole.administradora: [
    'view_home',
    'manage_users',
    'manage_churches',
    'manage_leaders',
    'manage_devotional',
    'manage_courses',
    'manage_events',
    'manage_community',
    'manage_ai',
    'manage_permissions',
    'view_reports',
    'view_financial',
    'manage_settings',
    'access_admin_panel',
  ],
  UserRole.superAdministradora: [
    'view_home',
    'manage_all',
    'view_all',
    'edit_all',
    'delete_all',
    'view_reports',
    'view_financial',
    'manage_settings',
    'access_admin_panel',
    'manage_system',
  ],
};

/// Riverpod provider for RBAC service
final rbacServiceProvider = Provider((ref) => RBACService());
