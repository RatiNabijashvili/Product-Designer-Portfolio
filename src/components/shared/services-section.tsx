import { services } from '@/lib/services-data';

export function ServicesSection() {
  return (
    <section className="mt-40">
      <div className="px-8">
        <header className="mb-12">
          <h2 className="text-xl font-bold uppercase leading-none text-[#919191]">
            02 / SERVICES
          </h2>
        </header>
      </div>
      <div className="border-y border-[#E4E4E4]">
        {services.map((service, index) => {
          // even index (0, 2) => icon on right, odd index (1, 3) => icon on left
          const isIconOnLeft = index % 2 !== 0;
          const Icon = service.icon;

          const iconDiv = (
            <div className="flex h-[480px] w-[360px] items-center justify-center">
              <Icon className="h-[200px] w-[200px] text-[#DCDCDC]" />
            </div>
          );

          const emptyDiv = <div className="h-[480px] w-[360px]"></div>;

          const textDiv = (
            <div className="flex h-[480px] w-[720px] flex-col items-center justify-center space-y-2 border-x border-[#E4E4E4] px-6 text-center">
              <h3 className="font-body text-[32px] font-bold uppercase leading-[1.2] text-primary">
                {service.title}
              </h3>
              <p className="font-body text-xl font-medium capitalize leading-[1.5] text-[#919191]">
                {service.description}
              </p>
            </div>
          );

          return (
            <div
              key={service.id}
              className="border-b border-[#E4E4E4] last:border-b-0"
            >
              <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center">
                {isIconOnLeft ? iconDiv : emptyDiv}
                {textDiv}
                {isIconOnLeft ? emptyDiv : iconDiv}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
