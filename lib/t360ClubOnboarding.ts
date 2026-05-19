import { supabase } from '@/lib/supabase';
import {
  isClubFaqComplete,
  isClubInfoTabComplete,
  isClubLocationTabComplete,
  isClubMeetingDetailsTabComplete,
  isClubMoreDetailsTabComplete,
  isClubSocialMediaComplete,
  type ClubProfileSetupFields,
} from '@/lib/clubInfoSetupCompletion';

export type T360OnboardingItem = {
  id: string;
  label: string;
  done: boolean;
};

export type T360OnboardingSection = {
  id: string;
  title: string;
  items: T360OnboardingItem[];
};

export type T360ClubOnboardingProgress = {
  sections: T360OnboardingSection[];
  completedCount: number;
  totalCount: number;
  percent: number;
  isComplete: boolean;
};

const EXCOMM_SLOT_COLUMNS = [
  'president_id',
  'vpe_id',
  'vpm_id',
  'vppr_id',
  'secretary_id',
  'treasurer_id',
  'saa_id',
  'ipp_id',
] as const;

function countFilledExcommSlots(profile: Record<string, unknown> | null): number {
  if (!profile) return 0;
  return EXCOMM_SLOT_COLUMNS.filter((col) => {
    const v = profile[col];
    return typeof v === 'string' && v.length > 0;
  }).length;
}

function msBetween(a: string | null | undefined, b: string | null | undefined): number {
  if (!a || !b) return 0;
  return Math.abs(new Date(a).getTime() - new Date(b).getTime());
}

function buildSections(flags: Record<string, boolean>): T360OnboardingSection[] {
  const sections: T360OnboardingSection[] = [
    {
      id: 'create_club',
      title: 'Create a club',
      items: [
        { id: 'club_name', label: 'Club name', done: flags.club_name },
        { id: 'club_charter_date', label: 'Club charter date', done: flags.club_charter_date },
        { id: 'club_number', label: 'Club number', done: flags.club_number },
      ],
    },
    {
      id: 'setting_up',
      title: 'Setting up the club',
      items: [
        { id: 'club_info', label: 'Club Info', done: flags.club_info },
        { id: 'club_location', label: 'Club location', done: flags.club_location },
        { id: 'club_meeting_details', label: 'Club meeting details', done: flags.club_meeting_details },
        { id: 'club_more_details', label: 'Club more details', done: flags.club_more_details },
        { id: 'club_social', label: 'Club social media', done: flags.club_social },
        { id: 'club_faq', label: 'Club FAQ', done: flags.club_faq },
      ],
    },
    {
      id: 'user_management',
      title: 'Club user management',
      items: [
        { id: 'invite_5', label: 'Invite at least 5 users', done: flags.invite_5 },
        { id: 'members_5', label: '5 members joined', done: flags.members_5 },
        { id: 'manage_users', label: 'Manage users', done: flags.manage_users },
        { id: 'roles_changed_2', label: '2 users’ roles changed', done: flags.roles_changed_2 },
        { id: 'manage_excomm', label: 'Manage ExComm roles', done: flags.manage_excomm },
        { id: 'excomm_5', label: 'Assigned at least 5 ExComm roles', done: flags.excomm_5 },
      ],
    },
    {
      id: 'meeting_management',
      title: 'Meeting management',
      items: [
        { id: 'meeting_created', label: 'Meeting created', done: flags.meeting_created },
        {
          id: 'roles_booked_5',
          label: 'At least 5 roles booked by 5 different people',
          done: flags.roles_booked_5,
        },
        { id: 'excomm_assigned_role', label: 'ExComm assigned a role', done: flags.excomm_assigned_role },
        { id: 'excomm_reassigned_role', label: 'ExComm reassigned a role', done: flags.excomm_reassigned_role },
        {
          id: 'role_moved_to_deleted',
          label: 'ExComm moved roles from Available to Deleted',
          done: flags.role_moved_to_deleted,
        },
        {
          id: 'role_moved_to_available',
          label: 'ExComm moved role from Deleted to Available',
          done: flags.role_moved_to_available,
        },
        { id: 'agenda_created', label: 'Agenda created', done: flags.agenda_created },
        { id: 'agenda_link_shared', label: 'Agenda link copied and shared', done: flags.agenda_link_shared },
        { id: 'vpe_smart_insights', label: 'Smart insights used by VPE', done: flags.vpe_smart_insights },
        { id: 'poll_created', label: 'Voting poll created', done: flags.poll_created },
        { id: 'poll_5_votes', label: 'At least 5 people voted', done: flags.poll_5_votes },
        { id: 'poll_closed', label: 'Voting closed', done: flags.poll_closed },
      ],
    },
  ];

  return sections;
}

function summarize(sections: T360OnboardingSection[]): T360ClubOnboardingProgress {
  const items = sections.flatMap((s) => s.items);
  const completedCount = items.filter((i) => i.done).length;
  const totalCount = items.length;
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  return {
    sections,
    completedCount,
    totalCount,
    percent,
    isComplete: completedCount === totalCount && totalCount > 0,
  };
}

export const EMPTY_T360_CLUB_ONBOARDING: T360ClubOnboardingProgress = summarize(buildSections({}));

/** True when the current user created this club (show onboarding checklist). */
export async function shouldShowT360ClubOnboarding(
  clubId: string,
  userId: string
): Promise<boolean> {
  const { data: club, error } = await supabase
    .from('clubs')
    .select('created_by')
    .eq('id', clubId)
    .maybeSingle();

  if (error || !club) return false;
  return club.created_by === userId;
}

/**
 * Loads checklist completion from existing club data.
 * Some meeting steps use heuristics when no audit trail exists (role reassignment, agenda copy).
 */
export async function fetchT360ClubOnboardingProgress(clubId: string): Promise<T360ClubOnboardingProgress> {
  const [clubRes, faqRes, inviteRes, membersRes, meetingsRes, rolesRes, pollsRes] = await Promise.all([
    supabase
      .from('clubs')
      .select(
        `
        id,
        name,
        club_number,
        charter_date,
        club_profiles (
          club_mission,
          club_status,
          club_type,
          banner_color,
          country,
          time_zone,
          address,
          city,
          google_location_link,
          region,
          district,
          division,
          area,
          meeting_day,
          meeting_frequency,
          meeting_start_time,
          meeting_end_time,
          meeting_type,
          online_meeting_link,
          vpe_id,
          president_id,
          vpm_id,
          vppr_id,
          secretary_id,
          treasurer_id,
          saa_id,
          ipp_id,
          facebook_url,
          twitter_url,
          linkedin_url,
          instagram_url,
          whatsapp_url,
          youtube_url,
          website_url
        )
      `
      )
      .eq('id', clubId)
      .maybeSingle(),
    supabase.from('club_faq_items').select('id, created_at, updated_at').eq('club_id', clubId),
    supabase.from('app_user_invitation').select('id', { count: 'exact', head: true }).eq('club_id', clubId),
    supabase
      .from('app_club_user_relationship')
      .select('id, user_id, role, created_at, updated_at')
      .eq('club_id', clubId),
    supabase
      .from('app_club_meeting')
      .select('id, is_agenda_visible')
      .eq('club_id', clubId),
    supabase
      .from('app_meeting_roles_management')
      .select(
        'assigned_user_id, booking_status, role_status, booked_at, created_at, updated_at, speech_title, speech_objectives'
      )
      .eq('club_id', clubId),
    supabase.from('polls').select('id, status').eq('club_id', clubId),
  ]);

  const club = clubRes.data;
  const rawProfile = club?.club_profiles;
  const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile;
  const profileRecord =
    profile && typeof profile === 'object' ? (profile as Record<string, unknown>) : null;
  const profileSetup = profileRecord as ClubProfileSetupFields | null;

  const members = membersRes.data ?? [];
  const meetings = meetingsRes.data ?? [];
  const roles = rolesRes.data ?? [];
  const polls = pollsRes.data ?? [];
  const meetingIds = meetings.map((m) => m.id);

  let agendaItemCount = 0;
  if (meetingIds.length > 0) {
    const { count } = await supabase
      .from('meeting_agenda_items')
      .select('id', { count: 'exact', head: true })
      .in('meeting_id', meetingIds);
    agendaItemCount = count ?? 0;
  }

  let distinctVoters = 0;
  const pollIds = polls.map((p) => p.id);
  if (pollIds.length > 0) {
    const { data: votes } = await supabase
      .from('simple_poll_votes')
      .select('user_id')
      .in('poll_id', pollIds);
    distinctVoters = new Set((votes ?? []).map((v) => v.user_id).filter(Boolean)).size;
  }

  const bookedRoles = roles.filter(
    (r) => r.booking_status === 'booked' && r.assigned_user_id && (r.role_status ?? 'Available') !== 'Deleted'
  );
  const distinctBookedUsers = new Set(bookedRoles.map((r) => r.assigned_user_id)).size;

  const roleChangeCount = members.filter(
    (m) => m.updated_at && m.created_at && msBetween(m.updated_at, m.created_at) > 10_000
  ).length;

  const hasDeletedRole = roles.some((r) => (r.role_status ?? 'Available') === 'Deleted');
  const hasAvailableRole = roles.some((r) => (r.role_status ?? 'Available') === 'Available');
  const hasRestoredRole = roles.some(
    (r) =>
      (r.role_status ?? 'Available') === 'Available' &&
      r.updated_at &&
      r.created_at &&
      msBetween(r.updated_at, r.created_at) > 10_000 &&
      hasDeletedRole
  );

  const excommAssigned = roles.some(
    (r) =>
      r.assigned_user_id &&
      r.booking_status === 'booked' &&
      r.updated_at &&
      r.created_at &&
      msBetween(r.updated_at, r.created_at) > 2_000
  );

  const excommReassigned = roles.some(
    (r) =>
      r.assigned_user_id &&
      r.booking_status === 'booked' &&
      r.booked_at &&
      r.updated_at &&
      msBetween(r.updated_at, r.booked_at) > 5_000
  );

  const flags: Record<string, boolean> = {
    club_name: Boolean(club?.name?.trim()),
    club_charter_date: Boolean(club?.charter_date),
    club_number: Boolean(club?.club_number?.trim()),
    club_info: isClubInfoTabComplete(profileSetup),
    club_location: isClubLocationTabComplete(profileSetup),
    club_meeting_details: isClubMeetingDetailsTabComplete(profileSetup),
    club_more_details: isClubMoreDetailsTabComplete(profileSetup),
    club_social: isClubSocialMediaComplete(profileSetup),
    club_faq: isClubFaqComplete(faqRes.data ?? []),
    invite_5: (inviteRes.count ?? 0) >= 5,
    members_5: members.length >= 5,
    manage_users: roleChangeCount >= 1,
    roles_changed_2: roleChangeCount >= 2,
    manage_excomm: countFilledExcommSlots(profileRecord) >= 1,
    excomm_5: countFilledExcommSlots(profileRecord) >= 5,
    meeting_created: meetings.length >= 1,
    roles_booked_5: distinctBookedUsers >= 5,
    excomm_assigned_role: excommAssigned || bookedRoles.length >= 1,
    excomm_reassigned_role: excommReassigned,
    role_moved_to_deleted: hasDeletedRole,
    role_moved_to_available: hasRestoredRole || (hasDeletedRole && hasAvailableRole),
    agenda_created: agendaItemCount >= 1,
    agenda_link_shared: meetings.some((m) => m.is_agenda_visible === true),
    vpe_smart_insights:
      Boolean(profileRecord?.vpe_id) &&
      roles.some(
        (r) =>
          (typeof r.speech_title === 'string' && r.speech_title.trim().length > 0) ||
          (typeof r.speech_objectives === 'string' && r.speech_objectives.trim().length > 0)
      ),
    poll_created: polls.length >= 1,
    poll_5_votes: distinctVoters >= 5,
    poll_closed: polls.some((p) => p.status === 'completed'),
  };

  return summarize(buildSections(flags));
}
