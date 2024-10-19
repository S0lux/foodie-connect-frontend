import { ModeToggle } from "./components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <ModeToggle />
      <Button>Click me</Button>
    </div>
  );
}