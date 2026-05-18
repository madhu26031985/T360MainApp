/** Bucket keys used in Club tab timer meeting-wise aggregates. */
export type TimerReportAggregateCategory =
  | 'prepared_speeches'
  | 'evaluation'
  | 'table_topic_speakers'
  | 'educational_speech';

/** Maps timer_reports.speech_category to Club tab aggregate buckets. */
export function mapTimerReportSpeechCategoryToAggregate(
  raw: string
): TimerReportAggregateCategory | null {
  const v = (raw || '').trim().toLowerCase();
  if (
    v === 'prepared_speaker' ||
    v === 'prepared_speech' ||
    v === 'prepared_speeches' ||
    v === 'prepared speech' ||
    v === 'ice_breaker'
  ) {
    return 'prepared_speeches';
  }
  if (v === 'evaluation' || v === 'evaluations') return 'evaluation';
  if (v === 'table_topic_speaker' || v === 'table_topic_speakers' || v === 'table topic speaker') {
    return 'table_topic_speakers';
  }
  if (v === 'educational_session' || v === 'educational_speech' || v === 'educational speech') {
    return 'educational_speech';
  }
  return null;
}
