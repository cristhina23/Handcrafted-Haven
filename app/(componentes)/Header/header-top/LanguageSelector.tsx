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
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
        
      </SelectContent>
    </Select>
  )
}

export default LanguageSelector