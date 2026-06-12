import { type ScheduleDay, type ScheduleAttributes, type Time, SCHEDULE_DAYS_KEYS, SCHEDULE_DAYS_OBJECTS, dateGetDay, datetimeGetTime } from "@brz/shared";

export function niceDay(day: ScheduleDay): string {
    const dayObject = SCHEDULE_DAYS_OBJECTS.find(d => d.value === day)
    return dayObject ? dayObject.label : '--'
}

export function niceTime(time: Time): string {
    time = time.replace(/\s/g, '') as Time // Remove any whitespace just in case
    const [hour, minute] = time.split(':')

    if (!hour || !minute) return '--'

    if (minute === '00') return `${hour}h`
    return `${hour}h${minute}`
}

export function isInIntervals(schedules: ScheduleAttributes[], date: Date): boolean {
    if (!schedules || schedules.length === 0) return false
    if (!date) return false

    const currentDay = SCHEDULE_DAYS_KEYS[dateGetDay(date) || 0]
    const currentTime = datetimeGetTime(date)

    const todaySchedule = schedules.find(schedule => schedule.day === currentDay)
    if (!todaySchedule) return false

    return todaySchedule.intervals.some(interval => currentTime >= interval.start && currentTime <= interval.end)
}

export function renderSchedules(schedules: ScheduleAttributes[]): string {
    let result = ''

    if (!schedules || schedules.length === 0) return 'Aucun horaire disponible'

    // Order schedules by day of the week
    schedules.sort((a, b) => SCHEDULE_DAYS_KEYS.indexOf(a.day) - SCHEDULE_DAYS_KEYS.indexOf(b.day))

    for (const schedule of schedules) {
        result += `Le ${niceDay(schedule.day)} : `

        for (const interval of schedule.intervals) {
            result += `de ${niceTime(interval.start)} à ${niceTime(interval.end)}, `
        }
        result = result.slice(0, -2) // remove the last comma and space

        result += '\n'
    }

    return result
}