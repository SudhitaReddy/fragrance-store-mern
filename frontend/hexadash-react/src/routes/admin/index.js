import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Spin } from "antd";
import withAdminLayout from "../../layout/withAdminLayout";
import GenerateAI from "../../pages/ai/GenerateAI";

// ✅ Lazy load your pages (create these pages if not yet created)
const Home = lazy(() => import("../../pages/Home"));
const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard")); // future use
const Inventory = lazy(() => import("../../pages/inventory/Inventory"));
const Formula = lazy(() => import("../../pages/formula/Formula"));
const Category = lazy(() => import("../../pages/category/Category"));
const Dilution = lazy(() => import("../../pages/dilution/Dilution"));
const AiFormula = lazy(() => import("../../pages/ai/GenerateAI"));
const Settings = lazy(() => import("../../pages/settings/Settings"));
const NotFound = lazy(() => import("../../container/pages/404"));
const FormulaList = lazy(() => import("../../pages/formula/FormulaList"))
const Admin = React.memo(() => {
  const { pathname } = useLocation();

  // Scroll to top on route change
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

  {/* Default Page */}
  <Route index element={<Home />} />

  {/* Future Dashboard */}
  <Route path="dashboard" element={<Dashboard />} />

  {/* Other Pages */}
  <Route path="inventory" element={<Inventory />} />
  <Route path="formula" element={<Formula />} />
  <Route path="formula-list" element={<FormulaList />} />
  <Route path="category" element={<Category />} />
  <Route path="dilution" element={<Dilution />} />
  <Route path="ai-formula" element={<GenerateAI />} />
  <Route path="settings" element={<Settings />} />

  <Route path="*" element={<NotFound />} />

</Routes>
    </Suspense>
  );
});

Admin.displayName = "Admin";

export default withAdminLayout(Admin);