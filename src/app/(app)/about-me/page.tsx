import SnapScroll from "@/components/SnapScroll";

export default function AboutMePage() {
  return (
    <main>
      <SnapScroll />

      {/* 1 — derecha */}
      <div className="h-screen snap-start bg-primary flex flex-col justify-end px-8 pb-16">
        <div className="max-w-[1400px] mx-auto w-full flex justify-end">
          <div className="w-full md:w-2/3">
            <h1 className="text-[48px] font-normal leading-[56px] tracking-[-1px] text-canvas mb-6">
              QUIEN SOY
            </h1>
            <p className="text-[32px] text-canvas leading-10 opacity-80">
              Soy Angel Manuel Sánchez Hipólito, tengo 22 años.
            </p>
          </div>
        </div>
      </div>

      {/* 2 — izquierda */}
      <div className="h-screen snap-start bg-primary flex flex-col justify-end px-8 pb-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="w-full md:w-2/3">
            <h1 className="text-[48px] font-normal leading-[56px] tracking-[-1px] text-canvas mb-6">
              PROFESIÓN
            </h1>
            <p className="text-[32px] text-canvas leading-10 opacity-80">
              Ingeniero en Informática de la Unidad Profesional Interdisciplinaria de Ingeniería y Ciencias Sociales y Administrativas IPN
            </p>
          </div>
        </div>
      </div>

      {/* 3 — derecha */}
      <div className="h-screen snap-start bg-primary flex flex-col justify-end px-8 pb-16">
        <div className="max-w-[1400px] mx-auto w-full flex justify-end">
          <div className="w-full md:w-2/3">
            <h1 className="text-[48px] font-normal leading-[56px] tracking-[-1px] text-canvas mb-6">
              OBJETIVO
            </h1>
            <p className="text-[32px] text-canvas leading-10 opacity-80">
              Busco desarrollar software listo para producción, automatizar procesos y crear soluciones que realmente aporten valor.
            </p>
          </div>
        </div>
      </div>

      {/* 4 — izquierda */}
      <div className="h-screen snap-start bg-primary flex flex-col justify-end px-8 pb-16">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="w-full md:w-2/3">
            <h1 className="text-[48px] font-normal leading-[56px] tracking-[-1px] text-canvas mb-6">
              HOBBIES
            </h1>
            <p className="text-[32px] text-canvas leading-10 opacity-80">
              Amante de los gatos, el basquetbol y el cafe. Siempre disfruto pasar tiempo con mi familia y amigos.
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
