import { Eye } from "lucide-react";

const CardImage = ({ image, name }) => {
  return (
    <div className="relative inline-block w-full">
      <img
        src={image}
        alt={name}
        className="block w-full rounded-lg object-cover object-center sm:h-96"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 hover:opacity-100">
        <div className="gap-4 flex">
          <div className="rounded-full bg-white p-3 transition-all hover:bg-slate-200">
            <Eye className="h-6 w-6 text-slate-700" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardImage;
