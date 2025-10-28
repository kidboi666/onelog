import { Metadata } from "next";
import ColorPicker from "./_components/ColorPicker";
import DarkModeSwitch from "./_components/DarkModeSwitch";
import LogoutButton from "./_components/LogoutButton";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="flex animate-fade-in flex-col gap-12">
      <ColorPicker />
      <DarkModeSwitch />
      <LogoutButton />
    </div>
  );
}
