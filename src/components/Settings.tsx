import { 
  Languages, 
  ChevronRight, 
  Scan, 
  Key, 
  Cloud, 
  Trash2, 
  Info, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";
import { cn } from "../lib/utils";

interface SettingsProps {}

export default function Settings() {
  return (
    <div className="p-4 space-y-8">
      <div className="space-y-1">
        <h2 className="font-display font-bold text-3xl text-on-surface">Settings</h2>
        <p className="text-on-surface-variant font-medium">Manage your account and preferences</p>
      </div>

      {/* Regional Settings */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-2">Regional Settings</h3>
        <div className="bg-white rounded-2xl border border-surface-container-highest shadow-sm overflow-hidden divide-y divide-surface-container-low">
          <div className="p-4 flex items-center justify-between group active:bg-surface-container-low transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-on-surface">Language</p>
                <p className="text-xs font-medium text-on-surface-variant">Switch system language</p>
              </div>
            </div>
            <div className="flex bg-surface-container-highest p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold rounded-md bg-primary-container text-white shadow-sm">EN</button>
              <button className="px-3 py-1 text-xs font-bold rounded-md text-on-surface-variant">TA</button>
              <button className="px-3 py-1 text-xs font-bold rounded-md text-on-surface-variant">SI</button>
            </div>
          </div>
        </div>
      </div>

      {/* Automation Settings */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-2">Automation</h3>
        <div className="bg-white rounded-2xl border border-surface-container-highest shadow-sm overflow-hidden divide-y divide-surface-container-low">
          <SettingsItem 
            icon={<Scan className="w-5 h-5" />} 
            title="Bill Scanner Settings" 
            subtitle="Auto-detect tax and categories" 
          />
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-on-surface">Use own API key</p>
                <p className="text-xs font-medium text-on-surface-variant">For OCR engine customization</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-container-highest after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security & Storage */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-2">Security & Storage</h3>
        <div className="bg-white rounded-2xl border border-surface-container-highest shadow-sm overflow-hidden divide-y divide-surface-container-low">
          <SettingsItem 
            icon={<Cloud className="w-5 h-5" />} 
            title="Data Backup" 
            subtitle="Sync with Google Drive or iCloud" 
            rightElement={
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">Active</span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant" />
              </div>
            }
          />
          <div className="p-4 flex items-center justify-between group active:bg-error/5 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-error">Clear Local Cache</p>
                <p className="text-xs font-medium text-error/60">Free up 124MB of space</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-2">Support</h3>
        <div className="bg-white rounded-2xl border border-surface-container-highest shadow-sm overflow-hidden divide-y divide-surface-container-low">
          <SettingsItem 
            icon={<Info className="w-5 h-5" />} 
            title="App Info" 
            subtitle="Version 2.4.0 (Stable)" 
          />
          <SettingsItem 
            icon={<ShieldCheck className="w-5 h-5" />} 
            title="Privacy Policy" 
            subtitle="How we handle your data" 
            rightElement={<ExternalLink className="w-4 h-4 text-on-surface-variant" />}
          />
        </div>
      </div>
    </div>
  );
}

function SettingsItem({ icon, title, subtitle, rightElement }: any) {
  return (
    <div className="p-4 flex items-center justify-between group active:bg-surface-container-low transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <p className="font-bold text-sm text-on-surface">{title}</p>
          <p className="text-xs font-medium text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      {rightElement || <ChevronRight className="w-4 h-4 text-on-surface-variant" />}
    </div>
  );
}
