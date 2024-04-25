-- CreateTable
CREATE TABLE "Customer" (
    "cust_id" SERIAL NOT NULL,
    "cust_fname" TEXT NOT NULL,
    "cust_lname" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("cust_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "ord_no" SERIAL NOT NULL,
    "ord_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cust_id" INTEGER NOT NULL,
    "waiter_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("ord_no")
);

-- CreateTable
CREATE TABLE "Waiter" (
    "waiter_id" SERIAL NOT NULL,
    "waiter_fname" TEXT NOT NULL,
    "waiter_lname" TEXT NOT NULL,

    CONSTRAINT "Waiter_pkey" PRIMARY KEY ("waiter_id")
);

-- CreateTable
CREATE TABLE "Tip" (
    "cust_id" INTEGER NOT NULL,
    "waiter_id" INTEGER NOT NULL,
    "tip" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("cust_id","waiter_id")
);

-- CreateTable
CREATE TABLE "Food" (
    "item_no" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "item_price" DOUBLE PRECISION NOT NULL,
    "item_stock" INTEGER NOT NULL,
    "chef_id" INTEGER NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("item_no")
);

-- CreateTable
CREATE TABLE "Chef" (
    "chef_id" SERIAL NOT NULL,
    "chef_fname" TEXT NOT NULL,
    "chef_lname" TEXT NOT NULL,
    "chef_type" TEXT NOT NULL,

    CONSTRAINT "Chef_pkey" PRIMARY KEY ("chef_id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "bill_no" SERIAL NOT NULL,
    "tot_price" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "net_payable" DOUBLE PRECISION NOT NULL,
    "ord_no" INTEGER NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("bill_no")
);

-- CreateTable
CREATE TABLE "Contains" (
    "item_no" INTEGER NOT NULL,
    "ord_no" INTEGER NOT NULL,

    CONSTRAINT "Contains_pkey" PRIMARY KEY ("item_no","ord_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_ord_no_key" ON "Bill"("ord_no");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customer"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_waiter_id_fkey" FOREIGN KEY ("waiter_id") REFERENCES "Waiter"("waiter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tip" ADD CONSTRAINT "Tip_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customer"("cust_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tip" ADD CONSTRAINT "Tip_waiter_id_fkey" FOREIGN KEY ("waiter_id") REFERENCES "Waiter"("waiter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "Chef"("chef_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_ord_no_fkey" FOREIGN KEY ("ord_no") REFERENCES "Order"("ord_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_item_no_fkey" FOREIGN KEY ("item_no") REFERENCES "Food"("item_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_ord_no_fkey" FOREIGN KEY ("ord_no") REFERENCES "Order"("ord_no") ON DELETE RESTRICT ON UPDATE CASCADE;
