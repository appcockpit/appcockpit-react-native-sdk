# Appcockpit: React-Native SDK

React-Native/Expo SDK for [Appcockpit](https://appcockpit.dev)

With appcockpit.dev it is easy to manage your app versions and maintenance mode in your app.

## Installation

Install via npm

```
npm i appcockpit-react-native-sdk --save
```

## Scheduled maintenance

When you schedule maintenance in the dashboard, `MaintenanceProvider` shows a
dismissible banner before it starts (from 24 hours before by default; set in the
dashboard), switches to the maintenance screen at the start time and back to
the app at the end time. Times are shown in the user's time zone.

```tsx
<MaintenanceProvider
  info={maintenanceInfo}
  apiToken="your-api-token"
  showBanner // default true
  locale="de-DE" // optional, defaults to the device locale
  theme={{ banner: { backgroundColor: "#111827" } }}
  // MaintenanceBanner={MyBanner} to render your own
>
  <YourApp />
</MaintenanceProvider>
```

## How to use it

Please find a detailed guide in our [Official Documentation](https://docs.appcockpit.dev/integration/react-native)

### License

The MIT License (MIT).

## Need help?

If you need support please write to us at support@appcockpit.dev
