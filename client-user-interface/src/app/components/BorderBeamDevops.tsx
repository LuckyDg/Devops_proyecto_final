import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedBeamDevops } from "./AnimatedBeamDevops";

export function BorderBeamDevops() {
  return (
    <div className="relative flex h-[350px] w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-4 shadow-md sm:p-6 md:shadow-lg">
      <AnimatedBeamDevops />
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
