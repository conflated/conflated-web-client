// @flow

export type TriggerGroup = $Exact<{
  +name: string,
  +worstTriggerCount: number,
  +intermediateTriggerCount: number,
  +bestTriggerCount: number
}>;
