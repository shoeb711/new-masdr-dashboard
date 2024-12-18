import InputField from "shared/components/customInput/TextArea";

const SettingDataContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="x-axis">X-axis</label>
        <div className="">
          <InputField placeholder="Enter X axis Label" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="x-axis">Y-axis</label>
        <div className="">
          <InputField placeholder="Enter Y axis Label" />
        </div>
      </div>
    </div>
  );
};

export default SettingDataContent;
