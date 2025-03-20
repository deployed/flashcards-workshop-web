import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/Text';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <WaveBackground variant="home" />
      <main className="mx-auto my-15 flex h-full flex-col items-center justify-between laptop:justify-start">
        <Logo />
        <div className="mx-12 my-20 flex flex-col gap-16 laptop:my-44 laptop:gap-28">
          <div className="flex flex-col items-center gap-content">
            <Text>Stwórz swój zestaw fiszek od zera</Text>
            <Button>Zacznij Tutaj</Button>
          </div>
          <div className="flex flex-col items-center gap-content">
            <Text className="text-center">
              Mając już stworzone fiszki, podejmij wyzwanie i sprawdź czego się nauczyłeś
            </Text>
            <Button>Sprawdź się</Button>
          </div>
        </div>
      </main>
    </>
  );
}
