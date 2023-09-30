"use client";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountriesInput from "../Inputs/CountriesInput";
import dynamic from "next/dynamic";
import CounterInput from "../Inputs/CounterInput";
import ImageUpload from "../Inputs/ImageUpload";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			categories: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}
		return "next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return "Back";
	}, [step]);
	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							onClick={(category) =>
								setCustomValue("category", category)
							}
							selected={item.label === category}
							label={item.label}
							icon={item.icon}
							key={item.label}
						/>
					</div>
				))}
			</div>
		</div>
	);
	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help people find you!"
				/>
				<CountriesInput
					value={location}
					onChange={(value) => setCustomValue("location", value)}
				/>
				<div className="z-0">
					<Map center={location?.latLng} />
				</div>
			</div>
		);
	}
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenities do you have?"
				/>
				<CounterInput
					onChange={(value) => setCustomValue("guestCount", value)}
					title="Guests"
					subtitle="How many guests do you allow?"
					value={guestCount}
				/>
				<hr />
				<CounterInput
					onChange={(value) => setCustomValue("roomCount", value)}
					title="Rooms"
					subtitle="How many rooms do you have?"
					value={roomCount}
				/>
				<hr />
				<CounterInput
					onChange={(value) => setCustomValue("bathroomCount", value)}
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
					value={bathroomCount}
				/>
			</div>
		);
	}
	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subtitle="Show guests what your place looks like!"
				/>
				<ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
			</div>
		);
	}
	return (
		<Modal
			title="Airbnb you home!"
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	);
};

export default RentModal;
