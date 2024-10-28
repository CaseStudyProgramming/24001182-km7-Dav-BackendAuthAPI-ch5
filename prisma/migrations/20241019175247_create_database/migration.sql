-- CreateTable
CREATE TABLE "caroptions" (
    "id" BIGSERIAL NOT NULL,
    "option_name" VARCHAR(255),

    CONSTRAINT "caroptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" BIGSERIAL NOT NULL,
    "plate" VARCHAR(255),
    "image" VARCHAR(255),
    "rentperday" INTEGER,
    "capacity" INTEGER,
    "description" TEXT,
    "availableat" TIMESTAMP(6),
    "available" BOOLEAN,
    "year" INTEGER,
    "transmission_id" BIGINT,
    "type_id" BIGINT,
    "manufacture_id" BIGINT,
    "model_id" BIGINT,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carspecs" (
    "id" BIGSERIAL NOT NULL,
    "spec_name" VARCHAR(255),

    CONSTRAINT "carspecs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacture" (
    "id" BIGSERIAL NOT NULL,
    "manufacture_name" VARCHAR(255),

    CONSTRAINT "manufacture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model" (
    "id" BIGSERIAL NOT NULL,
    "model_name" VARCHAR(255),

    CONSTRAINT "model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "option_id" BIGINT NOT NULL,
    "car_id" BIGINT NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("option_id","car_id")
);

-- CreateTable
CREATE TABLE "specs" (
    "spec_id" BIGINT NOT NULL,
    "car_id" BIGINT NOT NULL,

    CONSTRAINT "specs_pkey" PRIMARY KEY ("spec_id","car_id")
);

-- CreateTable
CREATE TABLE "transmission" (
    "id" BIGSERIAL NOT NULL,
    "transmission_option" VARCHAR(255),

    CONSTRAINT "transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" BIGSERIAL NOT NULL,
    "type_option" VARCHAR(255),

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "manufacture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "transmission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "caroptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specs" ADD CONSTRAINT "specs_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "specs" ADD CONSTRAINT "specs_spec_id_fkey" FOREIGN KEY ("spec_id") REFERENCES "carspecs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
