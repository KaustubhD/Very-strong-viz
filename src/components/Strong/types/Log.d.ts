export type Log = {
  date: string
  workoutName: string
  exerciseName: string
  setOrder: number
  weight?: number
  weightUnit?: string
  reps?: number
  rPE?: number
  distance?: number
  distanceUnit?: string
  seconds?: number
  notes?: string
  workoutNotes?: string
  workoutDuration: string

  // Added props
  volume: number
  maxSetVolume: number
  dateObj: Date
}
