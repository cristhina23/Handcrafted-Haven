import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LanguageSelectorProps = {
  defaultLang?: string;
};

export default function LanguageSelector({
  defaultLang = "en",
}: LanguageSelectorProps) {
  return (
    <Select defaultValue={defaultLang}>
      <SelectTrigger
        className="
          h-4            
          min-h-0        
          px-1
          py-0           
          text-[10px]    
          rounded-md
          bg-sky-300
          border border-slate-500
          focus:ring-1 focus:ring-sky-400
          hover:bg-slate-100
          transition
        "
      >
  <SelectValue placeholder="EN" />
</SelectTrigger>


      <SelectContent className="text-sm">
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Spanish</SelectItem>
      </SelectContent>
    </Select>
  );
}
