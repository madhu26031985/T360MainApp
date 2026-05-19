/** Matches editable fields in Club Info management tabs (admin/club-info-management). */

export type ClubProfileSetupFields = {
  club_mission?: string | null;
  club_status?: string | null;
  club_type?: string | null;
  banner_color?: string | null;
  country?: string | null;
  time_zone?: string | null;
  address?: string | null;
  city?: string | null;
  google_location_link?: string | null;
  region?: string | null;
  district?: string | null;
  division?: string | null;
  area?: string | null;
  meeting_day?: string | null;
  meeting_frequency?: string | null;
  meeting_start_time?: string | null;
  meeting_end_time?: string | null;
  meeting_type?: string | null;
  online_meeting_link?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  linkedin_url?: string | null;
  instagram_url?: string | null;
  whatsapp_url?: string | null;
  youtube_url?: string | null;
  website_url?: string | null;
};

const SOCIAL_URL_FIELDS = [
  'facebook_url',
  'twitter_url',
  'linkedin_url',
  'instagram_url',
  'whatsapp_url',
  'youtube_url',
  'website_url',
] as const;

export type ClubFaqSetupRow = {
  created_at?: string | null;
  updated_at?: string | null;
};

function filled(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Club Info tab — mission, status, type, banner colour (name/number/charter are read-only). */
export function isClubInfoTabComplete(profile: ClubProfileSetupFields | null | undefined): boolean {
  if (!profile) return false;
  return (
    filled(profile.club_mission) &&
    filled(profile.club_status) &&
    filled(profile.club_type) &&
    filled(profile.banner_color)
  );
}

/** Club Location tab — country, time zone, address, city, map link. */
export function isClubLocationTabComplete(profile: ClubProfileSetupFields | null | undefined): boolean {
  if (!profile) return false;
  return (
    filled(profile.country) &&
    filled(profile.time_zone) &&
    filled(profile.address) &&
    filled(profile.city) &&
    filled(profile.google_location_link)
  );
}

/** Club More Details tab — region, district, division, area. */
export function isClubMoreDetailsTabComplete(profile: ClubProfileSetupFields | null | undefined): boolean {
  if (!profile) return false;
  return (
    filled(profile.region) &&
    filled(profile.district) &&
    filled(profile.division) &&
    filled(profile.area)
  );
}

/** Club Meeting Details tab — all schedule fields shown in the meeting details grid. */
export function isClubMeetingDetailsTabComplete(profile: ClubProfileSetupFields | null | undefined): boolean {
  if (!profile) return false;
  return (
    filled(profile.meeting_day) &&
    filled(profile.meeting_frequency) &&
    filled(profile.meeting_start_time) &&
    filled(profile.meeting_end_time) &&
    filled(profile.meeting_type)
  );
}

/** Club Social Media screen — every platform link field filled. */
export function isClubSocialMediaComplete(profile: ClubProfileSetupFields | null | undefined): boolean {
  if (!profile) return false;
  return SOCIAL_URL_FIELDS.every((key) => filled(profile[key]));
}

/** Club FAQ — defaults loaded and at least one entry saved after review/edit. */
export function isClubFaqComplete(rows: ClubFaqSetupRow[]): boolean {
  if (rows.length === 0) return false;
  return rows.some((row) => {
    if (!row.updated_at || !row.created_at) return false;
    return Math.abs(new Date(row.updated_at).getTime() - new Date(row.created_at).getTime()) > 60_000;
  });
}
