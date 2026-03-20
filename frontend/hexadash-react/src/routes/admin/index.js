import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Spin } from "antd";
import withAdminLayout from "../../layout/withAdminLayout";

const Home = lazy(() => import("../../pages/Home"));
const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard"));
const Inventory = lazy(() => import("../../pages/inventory/Inventory"));
const AddChemical = lazy(() => import("../../pages/inventory/AddChemical"));
const EditChemical = lazy(() => import("../../pages/inventory/EditChemical"));
const Formula = lazy(() => import("../../pages/formula/Formula"));
const Category = lazy(() => import("../../pages/category/Category"));
const Dilution = lazy(() => import("../../pages/dilution/Dilution"));
const AiFormula = lazy(() => import("../../pages/ai/GenerateAI"));
const Settings = lazy(() => import("../../pages/settings/Settings"));
const NotFound = lazy(() => import("../../container/pages/404"));
const FormulaList = lazy(() => import("../../pages/formula/FormulaList"));
const ViewFormula =lazy(() => import("../../pages/formula/ViewFormula"));
const EditFormula =lazy(() => import("../../pages/formula/EditFormula"));
const ProduceFormula =lazy(() => import("../../pages/formula/ProduceFormula"));
const AddCategory = lazy(()=> import("../../pages/category/AddCategory"));
const EditCategory = lazy(()=> import("../../pages/category/EditCategory"));
const CreateDilution = lazy(() => import("../../pages/dilution/CreateDilution"));
const DilutionHistory = lazy(() => import("../../pages/dilution/DilutionHistory"));
const EditDilution = lazy(() => import("../../pages/dilution/EditDilution"));
const RecycleBin = lazy(() => import("../../pages/settings/RecycleBin"));
const AddHardware = lazy(() => import("../../pages/settings/AddHardware"));
const EditHardware = lazy(() => import("../../pages/settings/EditHardware"));
const HardwareInventory = lazy(() => import("../../pages/settings/HardwareInventory"));
const AdjustHardware = lazy(() => import("../../pages/settings/AdjustHardware"));

const Admin = React.memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>

        <Route index element={<Home />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/add" element={<AddChemical />} />
        <Route path="inventory/edit/:id" element={<EditChemical />} />

        <Route path="formula" element={<Formula />} />
        <Route path="formula-list" element={<FormulaList />} />
        <Route path="formula/view/:id" element={<ViewFormula />} />
        <Route path="formula/edit/:id" element={<EditFormula />} />
        <Route path="formula/produce/:id" element={<ProduceFormula />} />

        <Route path="category" element={<Category />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="category/edit/:id" element={<EditCategory />} />

        <Route path="dilution" element={<Dilution />} />
        <Route path="dilution/create" element={<CreateDilution />} />
        <Route path="dilution/history" element={<DilutionHistory />} />
        <Route path="dilution/edit/:id" element={<EditDilution />} />

        <Route path="ai-formula" element={<AiFormula />} />

        <Route path="settings" element={<Settings />} />
        <Route path="settings/recycle" element={<RecycleBin />} />
        <Route path="settings/hardware" element={<HardwareInventory />} />
        <Route path="settings/hardware/add" element={<AddHardware />} />
        <Route path="settings/hardware/edit/:id" element={<EditHardware />} />
        <Route path="settings/hardware/adjust/:id" element={<AdjustHardware />} />


        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
});

Admin.displayName = "Admin";

export default withAdminLayout(Admin);