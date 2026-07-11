// ==============================
// USER
// ==============================

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

// ==============================
// WORKSPACE
// ==============================

export enum WorkspaceMemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

// ==============================
// BOARD
// ==============================

export enum BoardMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

// ==============================
// TASK
// ==============================

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  BACKLOG = "BACKLOG",
}

// ==============================
// INVITATION
// ==============================

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  EXPIRED = "EXPIRED",
}

// ==============================
// NOTIFICATION
// ==============================

export enum NotificationType {
  SYSTEM = "SYSTEM",
  WORKSPACE = "WORKSPACE",
  INVITATION = "INVITATION",
  TASK = "TASK",
}

// ==============================
// ACTIVITY
// ==============================

export enum ActivityAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",

  INVITE = "INVITE",
  ACCEPT = "ACCEPT",
  DECLINE = "DECLINE",

  ASSIGN = "ASSIGN",
  UNASSIGN = "UNASSIGN",

  COMPLETE = "COMPLETE",
  REOPEN = "REOPEN",

  MOVE = "MOVE",

  ARCHIVE = "ARCHIVE",
  RESTORE = "RESTORE",
}
