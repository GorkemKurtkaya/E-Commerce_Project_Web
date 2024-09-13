import "../index.css";

function LeftSide() {
  return (
    <div className="flex items-center md:justify-end  p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg text-right">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex items-center justify-center">
            <img
              src="src/assets/vector.jpg"
              alt="Logo"
              className="h-auto max-w-xs object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center p-2 md:p-4 lg:p-6 mt-4">
            <p className="text-[#373A40] text-lg md:text-xl lg:text-2xl text-justify ">
              Sadece Hayal Et Sonra Olmasını Bekle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
