// Public API — Aux-prefixed exports for external package consumers
// Internal docs and development use clean names from ./index.js

export {
  Button as AuxButton,
  Badge as AuxBadge,
  Input as AuxInput,
  Checkbox as AuxCheckbox,
  Radio as AuxRadio,
  RadioGroup as AuxRadioGroup,
  CheckboxGroup as AuxCheckboxGroup,
  Toggle as AuxToggle,
  Textarea as AuxTextarea,
  Alert as AuxAlert,
  Spinner as AuxSpinner,
  Avatar as AuxAvatar,
  AvatarGroup as AuxAvatarGroup,
  Separator as AuxSeparator,
  Identicon as AuxIdenticon,
  Select as AuxSelect,
  Tabs as AuxTabs,
  Tab as AuxTab,
  Dialog as AuxDialog,
  Toast as AuxToast,
  ToastContainer as AuxToastContainer,
  Hero as AuxHero,
  Header as AuxHeader,
  Section as AuxSection,
  Popover as AuxPopover,
  Tooltip as AuxTooltip,
  Dropdown as AuxDropdown,
  DropdownItem as AuxDropdownItem,
  DropdownGroup as AuxDropdownGroup,
  DropdownSeparator as AuxDropdownSeparator,
  Combobox as AuxCombobox,
  FormField as AuxFormField,
  Link as AuxLink,
  VisuallyHidden as AuxVisuallyHidden
} from './index.js'

export { useToast } from './core/useToast.js'
export { useTheme } from './core/useTheme.js'
