export enum WidgetActionTypes {
  UPDATE_WIDGET_IMAGE = "UPDATE_WIDGET_IMAGE",
  MANUPULATE_DOM_IMAGE = "MANUPULATE_DOM_IMAGE",
}

// Note: "Cabinit" keyword is used as a prefix to avoid conflicts with other extensions.
export enum ChromeStorageKeys {
  ExtensionOptionsActiveTab = "CabinitExtensionOptionsActiveTab",
  ExtensionOptionsSettingsActiveTab = "CabinitExtensionOptionsSettingsActiveTab",
  ExtensionOptionsOnboardingIsActive = "CabinitExtensionOptionsOnboardingIsActive",
  isExtensionActive = "isCabinitExtensionActive",
}
