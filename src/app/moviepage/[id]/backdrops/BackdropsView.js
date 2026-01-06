import Image from "next/image";

export default function BackdropsView({ backdrops }) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {backdrops.map((p) => (
        <div key={p.file_path} className="group rounded-lg overflow-hidden flex flex-col shadow-md">
          <a href={`https://image.tmdb.org/t/p/original${p.file_path}`} target="_blank" rel="noopener noreferrer">
            <div className="relative overflow-hidden h-full">
              <Image
                  src={
                      p.file_path
                      ? `https://image.tmdb.org/t/p/w500${p.file_path}`
                      : "/assets/images/no_profile.png"
                  }
                  alt={p.file_path}
                  width={300}
                  height={600}
                  className="w-full h-fullo object-cover transition-transform duration-300 ease-out group-hover:scale-120"
              />
            </div>
            </a>
        </div>
      ))}
    </div>
  );
}
