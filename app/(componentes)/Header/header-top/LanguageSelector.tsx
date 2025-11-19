import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type LanguageSelectorProps = {
  defaultLang?: string;
};

function LanguageSelector({ defaultLang = "en" }: LanguageSelectorProps) {
  return (
    <Select>
      <SelectTrigger className="w-[110px] text-gray-900 border-slate-500 outline-none focus:outline-none focus:ring-2 focus:ring-[#6EBADD] focus:border-[#6EBADD] data-[placeholder]:text-slate-800">
        <SelectValue placeholder="Language"  />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
        
      </SelectContent>
    </Select>
  )
}

export default LanguageSelector