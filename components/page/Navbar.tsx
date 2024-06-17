import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-5 bg-blue-500 text-white">
      <div className="text-xl font-bold">Arnab Portfolio</div>
      <div>
        <Sheet>
          <SheetTrigger>
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="top">
            <div className="min-h-screen">
              <SheetHeader>Arnab Portfolio</SheetHeader>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;
