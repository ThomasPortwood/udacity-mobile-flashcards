import {
  getPermissionsAsync,
  cancelAllScheduledNotificationsAsync,
  setNotificationHandler,
  scheduleNotificationAsync
} from 'expo-notifications'

export async function getNotificationPermission() {

  const permission = await getPermissionsAsync()

  if (permission.status === 'granted')
    return

  await Permissions.askAsync(Permissions.NOTIFICATIONS)

}

export async function moveNextPushNotificationToTomorrow() {

  const permission = await getPermissionsAsync()

  if (permission.status !== 'granted') {
    console.log('Skipping notification due to permission: ' + permission.status)
    return
  }

  await cancelAllScheduledNotificationsAsync()

  const trigger = new Date();
  trigger.setDate(trigger.getDate() + 1)
  trigger.setHours(20)
  trigger.setMinutes(0);
  trigger.setSeconds(0);

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  await scheduleNotificationAsync({
    content: {
      title: "Slacker!",
      body: "Don't forget to do your flashcards today.",
      data: { data: 'some data' },
    },
    trigger
  });

  console.log('Notification set for: ' + trigger.toString())
}
