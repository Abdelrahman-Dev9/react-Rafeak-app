import { useAddNotificationMutation } from "@/redux/service/notifications/notificationsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { z } from "zod";
import resetIcon from "../../assets/reset.png";

const schema = z.object({
  subject: z.string().min(1, "العنوان مطلوب"),
  sendTo: z.enum(["الكل", "كفيف", "ذوي قدرات مختلفه", "متطوع"]),
});

const sendToOptions = {
  الكل: "الكل",
  كفيف: "كفيف",
  "ذوي قدرات مختلفه": "ذوي قدرات مختلفه",
  متطوع: "متطوع",
};

type FormData = z.infer<typeof schema>;

type Props = {
  setOpenModal: (value: boolean) => void;
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 gap-3">
      <span className="text-gray-800 font-medium text-sm shrink-0 whitespace-nowrap">
        {label}:
      </span>
      {children}
    </div>
    {error && <p className="text-red-500 text-xs text-right pr-3">{error}</p>}
  </div>
);

const CreateNotification = ({ setOpenModal }: Props) => {
  const [addNotification, { isLoading }] = useAddNotificationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      sendTo: "الكل",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addNotification({
        subject: data.subject.trim(),
        sendTo: data.sendTo.trim(),
      }).unwrap();

      reset();
      setOpenModal(false);
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "حدث خطأ غير متوقع";

      alert(message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-white w-[680px] rounded-3xl px-12 py-10 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="absolute top-5 right-5 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center"
        >
          <MdClose size={18} />
        </button>

        <h2 className="text-[24px] font-semibold text-center text-[#418FBF] mb-8 mt-10">
          إضافة إشعار جديد
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* SUBJECT */}
          <Field label="العنوان" error={errors.subject?.message}>
            <input
              {...register("subject")}
              type="text"
              placeholder="اكتشفنا طلب مساعدة مناسب لك. برجاء الدخول ومراجعته."
              className="flex-1 text-right text-sm text-black outline-none placeholder-[#B4B0BF]"
              dir="rtl"
            />
          </Field>

          {/* SEND TO */}
          <Field label="أرسل إلى" error={errors.sendTo?.message}>
            <select
              {...register("sendTo")}
              className="flex-1 text-right text-sm outline-none bg-transparent"
              dir="rtl"
            >
              <option value="">اختر الجهة</option>

              {Object.entries(sendToOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <div className="flex flex-row-reverse items-center justify-between mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#418FBF] hover:bg-[#357aa8] text-white font-semibold px-16 py-3 rounded-2xl disabled:opacity-60"
            >
              {isLoading ? "جارٍ الإرسال..." : "إرسال"}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="flex items-center gap-2 border border-[#418FBF] text-[#418FBF] hover:bg-blue-50 font-semibold px-10 py-3 rounded-2xl"
            >
              <img src={resetIcon} alt="resetIcon" />
              إعادة تعيين الكل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotification;
