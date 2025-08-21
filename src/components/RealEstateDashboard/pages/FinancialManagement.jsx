import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Download,
  Plus,
  Eye,
  Edit,
  Filter,
  Calendar,
  Building,
  Users,
  FileText,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  Receipt,
  Gavel,
  PiggyBank,
  ArrowUp,
  ArrowDown,
  Calculator,
  FileCheck,
  Truck,
  UserCheck,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

// Mock data for demonstration - Replace with Firebase backend data
const mockData = {
  // Data Source: Dashboard overview aggregations from all modules
  overview: {
    totalRevenue: 12500000, // Sum from all revenue sources
    totalExpenses: 8200000, // Sum from all project expenses
    netProfit: 4300000, // totalRevenue - totalExpenses
    pendingPayments: 750000, // Sum of all pending incoming payments
    pendingCommissions: 125000, // Sum of approved but unpaid commissions
    activeProjects: 8, // Count from projects module
    totalSalesRevenue: 8500000, // From property sales
    totalRentalRevenue: 2200000, // From rental collections
    totalAuctionRevenue: 1500000, // From auction proceeds
    totalMortgageRevenue: 300000, // From EMI collections
  },

  // Data Source: Revenue module - linked to properties and projects
  revenueStreams: {
    sales: [
      {
        id: "SAL001",
        date: "2025-08-10",
        propertyId: "PROP_A201", // Link to properties module
        propertyName: "Skyline Villa - Unit A-201",
        projectId: "PROJ_001", // Link to projects module
        buyerId: "BUY_001", // Link to buyers/customers module
        buyerName: "Rajesh Sharma",
        saleAmount: 2500000,
        paidAmount: 2500000,
        pendingAmount: 0,
        paymentStage: "Final Payment", // booking/installment/final
        status: "Completed",
        paymentMethod: "Bank Transfer",
        receiptGenerated: true,
      },
      {
        id: "SAL002",
        date: "2025-08-08",
        propertyId: "PROP_B105",
        propertyName: "Garden Heights - Unit B-105",
        projectId: "PROJ_002",
        buyerId: "BUY_002",
        buyerName: "Priya Singh",
        saleAmount: 1800000,
        paidAmount: 900000,
        pendingAmount: 900000,
        paymentStage: "Second Installment",
        status: "Partial",
        paymentMethod: "Cheque",
        receiptGenerated: false,
      },
    ],
    rentals: [
      {
        id: "RNT001",
        date: "2025-08-01",
        propertyId: "PROP_C301",
        propertyName: "Ocean View Apartment - C-301",
        tenantId: "TNT_001",
        tenantName: "Amit Kumar",
        monthlyRent: 25000,
        securityDeposit: 75000,
        collectionCycle: "Monthly",
        dueDate: "2025-09-01",
        status: "Collected",
        overdueAmount: 0,
        paymentMethod: "UPI",
      },
      {
        id: "RNT002",
        date: "2025-07-28",
        propertyId: "PROP_D205",
        propertyName: "City Plaza - Shop D-205",
        tenantId: "TNT_002",
        tenantName: "Retail Store Pvt Ltd",
        monthlyRent: 45000,
        securityDeposit: 135000,
        collectionCycle: "Monthly",
        dueDate: "2025-08-28",
        status: "Overdue",
        overdueAmount: 45000,
        paymentMethod: "Bank Transfer",
      },
    ],
    auctions: [
      {
        id: "AUC001",
        date: "2025-08-05",
        propertyId: "PROP_E101",
        propertyName: "Commercial Plot - Sector 15",
        projectId: "PROJ_003",
        winnerId: "WIN_001",
        winnerName: "Metro Developers",
        reservePrice: 5000000,
        winningBid: 6200000,
        paidAmount: 1240000, // 20% advance
        pendingAmount: 4960000,
        paymentSchedule: "60 days",
        status: "Pending Payment",
      },
    ],
    mortgages: [
      {
        id: "MOR001",
        propertyId: "PROP_F401",
        propertyName: "Skyline Villa - F-401",
        borrowerId: "BOR_001",
        borrowerName: "Sanjay Patel",
        principalAmount: 2000000,
        interestRate: 8.5,
        emiAmount: 15000,
        paidEmis: 12,
        pendingEmis: 108,
        nextDueDate: "2025-09-01",
        status: "Active",
        penaltyAmount: 0,
      },
    ],
  },

  // Data Source: Commissions module - calculated from closed deals
  commissions: [
    {
      id: "COM001",
      dealId: "SAL001", // Link to revenue record
      brokerId: "BRK_001", // Link to brokers/agents module
      brokerName: "Rajesh Kumar",
      propertyName: "Skyline Villa - A-201",
      saleAmount: 2500000,
      commissionType: "Percentage", // Percentage/Flat Rate/Tiered
      commissionRate: 3,
      commissionAmount: 75000,
      calculatedDate: "2025-08-10",
      status: "Approved",
      approvedBy: "Manager", // Link to users module
      approvedDate: "2025-08-11",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "COM002",
      dealId: "SAL002",
      brokerId: "BRK_002",
      brokerName: "Priya Sharma",
      propertyName: "Garden Heights - B-105",
      saleAmount: 1800000,
      commissionType: "Percentage",
      commissionRate: 2.5,
      commissionAmount: 45000,
      calculatedDate: "2025-08-08",
      status: "Paid",
      approvedBy: "Manager",
      approvedDate: "2025-08-09",
      paymentDate: "2025-08-12",
      paymentMethod: "Bank Transfer",
    },
  ],

  // Data Source: Project expenses module
  projectExpenses: {
    // Purchase Orders - commitments to purchase
    purchaseOrders: [
      {
        id: "PO001",
        projectId: "PROJ_001", // Link to projects module
        projectName: "Ocean View Project",
        vendorId: "VND_001", // Link to vendors module
        vendorName: "ABC Construction Supplies",
        poDate: "2025-08-01",
        items: [
          {
            description: "Cement Bags",
            quantity: 100,
            unitPrice: 400,
            total: 40000,
          },
          {
            description: "Steel Bars",
            quantity: 50,
            unitPrice: 5200,
            total: 260000,
          },
        ],
        totalAmount: 300000,
        expectedDeliveryDate: "2025-08-15",
        actualDeliveryDate: null,
        status: "Approved", // Draft/Approved/Delivered/Billed
        attachments: ["po_001.pdf", "vendor_quote.pdf"],
        linkedRaBillId: null,
        createdBy: "Purchase Manager",
        approvedBy: "Project Manager",
        approvedDate: "2025-08-02",
      },
      {
        id: "PO002",
        projectId: "PROJ_002",
        projectName: "Skyline Villa",
        vendorId: "VND_002",
        vendorName: "XYZ Electricals",
        poDate: "2025-07-28",
        items: [
          {
            description: "Electrical Wiring",
            quantity: 500,
            unitPrice: 120,
            total: 60000,
          },
          {
            description: "Switch Boards",
            quantity: 40,
            unitPrice: 800,
            total: 32000,
          },
        ],
        totalAmount: 92000,
        expectedDeliveryDate: "2025-08-05",
        actualDeliveryDate: "2025-08-05",
        status: "Delivered",
        attachments: ["po_002.pdf"],
        linkedRaBillId: null,
        createdBy: "Purchase Manager",
        approvedBy: "Project Manager",
        approvedDate: "2025-07-29",
      },
    ],

    // RA Bills - progressive billing by contractors
    raBills: [
      {
        id: "RA001",
        projectId: "PROJ_001",
        projectName: "Garden Heights",
        contractorId: "CON_001", // Link to contractors module
        contractorName: "Smart Builders Pvt Ltd",
        raBillDate: "2025-08-10",
        workStage: "Foundation Work - Phase 2",
        workDescription: "Concrete pouring and curing completed",
        previousBillAmount: 1200000,
        currentBillAmount: 800000,
        totalWorkValue: 3000000,
        completionPercentage: 75,
        retentionPercentage: 10,
        retentionAmount: 80000,
        netPayableAmount: 720000,
        gstAmount: 144000, // 20% GST on net amount
        totalAmount: 864000,
        status: "Approved", // Draft/Verified/Approved/Paid
        verifiedBy: "Site Engineer",
        verifiedDate: "2025-08-11",
        approvedBy: "Project Manager",
        approvedDate: "2025-08-12",
        paymentDueDate: "2025-08-20",
        attachments: ["work_completion_cert.pdf", "measurement_sheet.pdf"],
        linkedPoId: null,
      },
      {
        id: "RA002",
        projectId: "PROJ_002",
        projectName: "Ocean View Project",
        contractorId: "CON_002",
        contractorName: "Metro Construction",
        raBillDate: "2025-08-08",
        workStage: "Plumbing Installation",
        workDescription: "Main pipeline and bathroom fittings",
        previousBillAmount: 200000,
        currentBillAmount: 300000,
        totalWorkValue: 600000,
        completionPercentage: 50,
        retentionPercentage: 5,
        retentionAmount: 15000,
        netPayableAmount: 285000,
        gstAmount: 57000,
        totalAmount: 342000,
        status: "Verified",
        verifiedBy: "Site Engineer",
        verifiedDate: "2025-08-09",
        approvedBy: null,
        approvedDate: null,
        paymentDueDate: "2025-08-18",
        attachments: ["plumbing_progress.pdf"],
        linkedPoId: null,
      },
    ],

    // Vendor Invoices - one-time services
    vendorInvoices: [
      {
        id: "VI001",
        projectId: "PROJ_001",
        projectName: "Ocean View Project",
        vendorId: "VND_003",
        vendorName: "City Marketing Agency",
        invoiceDate: "2025-08-05",
        invoiceNumber: "CMA/2025/001",
        serviceDescription: "Digital marketing campaign for project launch",
        category: "Marketing",
        baseAmount: 150000,
        gstAmount: 27000,
        totalAmount: 177000,
        dueDate: "2025-08-20",
        status: "Pending Payment",
        attachments: ["invoice_CMA_001.pdf"],
      },
      {
        id: "VI002",
        projectId: "PROJ_002",
        projectName: "Skyline Villa",
        vendorId: "VND_004",
        vendorName: "Legal Services Co.",
        invoiceDate: "2025-08-03",
        invoiceNumber: "LSC/2025/089",
        serviceDescription: "Property registration and legal clearances",
        category: "Legal/Permits",
        baseAmount: 85000,
        gstAmount: 15300,
        totalAmount: 100300,
        dueDate: "2025-08-18",
        status: "Paid",
        paidDate: "2025-08-15",
        paymentMethod: "Bank Transfer",
        attachments: ["invoice_LSC_089.pdf", "payment_receipt.pdf"],
      },
    ],
  },

  // Data Source: Payments module - both incoming and outgoing
  payments: {
    incoming: [
      {
        id: "IN001",
        date: "2025-08-10",
        sourceType: "Sale", // Sale/Rent/Auction/Mortgage
        sourceId: "SAL001",
        propertyName: "Skyline Villa - A-201",
        payerName: "Rajesh Sharma",
        amount: 2500000,
        paymentMethod: "Bank Transfer",
        bankDetails: "HDFC Bank - ****4567",
        transactionId: "TXN789123456",
        status: "Completed",
        receiptGenerated: true,
        receiptNumber: "RCP/2025/001",
      },
      {
        id: "IN002",
        date: "2025-08-01",
        sourceType: "Rent",
        sourceId: "RNT001",
        propertyName: "Ocean View Apartment - C-301",
        payerName: "Amit Kumar",
        amount: 25000,
        paymentMethod: "UPI",
        bankDetails: "UPI ID: amit.kumar@paytm",
        transactionId: "UPI456789123",
        status: "Completed",
        receiptGenerated: true,
        receiptNumber: "RCP/2025/002",
      },
    ],
    outgoing: [
      {
        id: "OUT001",
        date: "2025-08-12",
        paymentType: "Commission", // Commission/Vendor Payment/Contractor Payment
        sourceId: "COM002",
        payeeName: "Priya Sharma",
        description: "Broker commission for Garden Heights - B-105",
        amount: 45000,
        paymentMethod: "Bank Transfer",
        bankDetails: "SBI Bank - ****8901",
        transactionId: "NEFT123789456",
        status: "Completed",
        approvedBy: "Finance Manager",
        approvedDate: "2025-08-12",
      },
      {
        id: "OUT002",
        date: "2025-08-15",
        paymentType: "Vendor Payment",
        sourceId: "VI002",
        payeeName: "Legal Services Co.",
        description: "Legal services for Skyline Villa",
        amount: 100300,
        paymentMethod: "Bank Transfer",
        bankDetails: "ICICI Bank - ****2345",
        transactionId: "NEFT789123654",
        status: "Completed",
        approvedBy: "Project Manager",
        approvedDate: "2025-08-14",
      },
    ],
  },

  // Data Source: Reports aggregations from all above data
  reports: {
    monthlyRevenue: [
      {
        month: "Jan 2025",
        sales: 5200000,
        rentals: 180000,
        auctions: 0,
        mortgages: 25000,
      },
      {
        month: "Feb 2025",
        sales: 3800000,
        rentals: 185000,
        auctions: 6200000,
        mortgages: 30000,
      },
      {
        month: "Mar 2025",
        sales: 4200000,
        rentals: 190000,
        auctions: 0,
        mortgages: 28000,
      },
    ],
    projectProfitability: [
      {
        projectName: "Ocean View Project",
        revenue: 4200000,
        expenses: 2800000,
        profit: 1400000,
        margin: 33.3,
      },
      {
        projectName: "Skyline Villa",
        revenue: 3800000,
        expenses: 2100000,
        profit: 1700000,
        margin: 44.7,
      },
    ],
  },
};

const FinanceModule = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProject, setSelectedProject] = useState("all");
  const [dateRange, setDateRange] = useState("thisMonth");

  // State for sub-tabs
  const [activeRevenueSubTab, setActiveRevenueSubTab] = useState("sales");
  const [activeExpenseSubTab, setActiveExpenseSubTab] =
    useState("purchaseOrders");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "paid":
      case "approved":
      case "collected":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
      case "verified":
      case "pending payment":
      case "partial":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const SubTabButton = ({
    id,
    label,
    icon,
    count,
    activeSubTab,
    setActiveSubTab,
  }) => {
    const Icon = icon;
    const isActive = activeSubTab === id;
    return (
      <button
        onClick={() => setActiveSubTab(id)}
        className={`flex items-center py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
          isActive
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        <Icon className="h-4 w-4 mr-2" />
        {label}
        {count !== undefined && (
          <span
            className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {count}
          </span>
        )}
      </button>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Revenue Metrics - Data from revenue aggregations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Revenue</p>
              <p className="text-2xl font-bold">
                {formatCurrency(mockData.overview.totalRevenue)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Total Expenses</p>
              <p className="text-2xl font-bold">
                {formatCurrency(mockData.overview.totalExpenses)}
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Net Profit</p>
              <p className="text-2xl font-bold">
                {formatCurrency(mockData.overview.netProfit)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Projects</p>
              <p className="text-2xl font-bold">
                {mockData.overview.activeProjects}
              </p>
            </div>
            <Building className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Revenue Breakdown by Source - Data from revenue streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
          <div className="flex items-center mb-2">
            <Home className="h-5 w-5 text-emerald-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">Sales Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(mockData.overview.totalSalesRevenue)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center mb-2">
            <Receipt className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Rental Revenue
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(mockData.overview.totalRentalRevenue)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
          <div className="flex items-center mb-2">
            <Gavel className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Auction Revenue
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(mockData.overview.totalAuctionRevenue)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
          <div className="flex items-center mb-2">
            <PiggyBank className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Mortgage Revenue
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(mockData.overview.totalMortgageRevenue)}
          </p>
        </div>
      </div>

      {/* Pending Actions - Data from payments and commissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-200">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Pending Collections
            </h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {formatCurrency(mockData.overview.pendingPayments)}
          </p>
          <p className="text-sm text-gray-500 mt-1">From buyers & tenants</p>
          <button className="mt-3 text-orange-600 hover:text-orange-800 text-sm font-medium">
            View Details →
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Pending Commission Payouts
            </h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(mockData.overview.pendingCommissions)}
          </p>
          <p className="text-sm text-gray-500 mt-1">For brokers & agents</p>
          <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
            Process Payments →
          </button>
        </div>
      </div>

      {/* Recent Transactions Summary - Data from payments module */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Recent Financial Activity
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...mockData.payments.incoming, ...mockData.payments.outgoing]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 4)
              .map((payment) => {
                const isIncoming = "payerName" in payment;
                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          isIncoming ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {isIncoming ? (
                          <ArrowUp className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {isIncoming ? payment.payerName : payment.payeeName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {isIncoming
                            ? payment.propertyName
                            : payment.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          isIncoming ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isIncoming ? "+" : "-"}
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );

  const RevenueTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Revenue Tracking</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Record Revenue
        </button>
      </div>

      {/* Revenue Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <SubTabButton
              id="sales"
              label="Property Sales"
              icon={Home}
              count={mockData.revenueStreams.sales.length}
              activeSubTab={activeRevenueSubTab}
              setActiveSubTab={setActiveRevenueSubTab}
            />
            <SubTabButton
              id="rentals"
              label="Rental Income"
              icon={Receipt}
              count={mockData.revenueStreams.rentals.length}
              activeSubTab={activeRevenueSubTab}
              setActiveSubTab={setActiveRevenueSubTab}
            />
            <SubTabButton
              id="auctions"
              label="Auction Proceeds"
              icon={Gavel}
              count={mockData.revenueStreams.auctions.length}
              activeSubTab={activeRevenueSubTab}
              setActiveSubTab={setActiveRevenueSubTab}
            />
            <SubTabButton
              id="mortgages"
              label="Mortgage Collections"
              icon={PiggyBank}
              count={mockData.revenueStreams.mortgages.length}
              activeSubTab={activeRevenueSubTab}
              setActiveSubTab={setActiveRevenueSubTab}
            />
          </nav>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            {activeRevenueSubTab === "sales" && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Buyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Sale Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Paid Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Pending
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.revenueStreams.sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {sale.propertyName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {sale.propertyId}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {sale.buyerName}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        {formatCurrency(sale.saleAmount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">
                        {formatCurrency(sale.paidAmount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">
                        {sale.pendingAmount > 0
                          ? formatCurrency(sale.pendingAmount)
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            sale.status
                          )}`}
                        >
                          {sale.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Receipt className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* Add similar tables for rentals, auctions, mortgages here */}
          </div>
        </div>
      </div>
    </div>
  );

  const CommissionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Broker & Team Commissions
        </h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Commission
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Paid Commissions
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(
              mockData.commissions
                .filter((c) => c.status === "Paid")
                .reduce((sum, c) => sum + c.commissionAmount, 0)
            )}
          </p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Pending Approval
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(
              mockData.commissions
                .filter((c) => c.status === "Approved")
                .reduce((sum, c) => sum + c.commissionAmount, 0)
            )}
          </p>
          <p className="text-sm text-gray-500">Ready to pay</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Active Brokers
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {new Set(mockData.commissions.map((c) => c.brokerId)).size}
          </p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            Commission Records
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Commission ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Broker/Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Property/Deal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Sale Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rate (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Commission Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockData.commissions.map((comm) => (
                <tr key={comm.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-purple-600">
                    {comm.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {comm.brokerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {comm.brokerId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {comm.propertyName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {formatCurrency(comm.saleAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {comm.commissionRate}%
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">
                    {formatCurrency(comm.commissionAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        comm.status
                      )}`}
                    >
                      {comm.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      {comm.status === "Approved" && (
                        <button className="text-green-600 hover:text-green-800">
                          <CreditCard className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProjectExpensesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Project Expense Management
        </h2>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create P.O.
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <FileCheck className="h-4 w-4 mr-2" />
            New RA Bill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Purchase Orders
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {mockData.projectExpenses.purchaseOrders.length}
          </p>
          <p className="text-sm text-gray-500">
            {formatCurrency(
              mockData.projectExpenses.purchaseOrders.reduce(
                (sum, po) => sum + po.totalAmount,
                0
              )
            )}{" "}
            total
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">RA Bills</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {mockData.projectExpenses.raBills.length}
          </p>
          <p className="text-sm text-gray-500">
            {formatCurrency(
              mockData.projectExpenses.raBills.reduce(
                (sum, ra) => sum + ra.totalAmount,
                0
              )
            )}{" "}
            total
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center mb-2">
            <Receipt className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Vendor Invoices
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {mockData.projectExpenses.vendorInvoices.length}
          </p>
          <p className="text-sm text-gray-500">
            {formatCurrency(
              mockData.projectExpenses.vendorInvoices.reduce(
                (sum, vi) => sum + vi.totalAmount,
                0
              )
            )}{" "}
            total
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
          <div className="flex items-center mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-600">
              Pending Payments
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {mockData.projectExpenses.raBills.filter((r) => r.status !== "Paid")
              .length +
              mockData.projectExpenses.vendorInvoices.filter(
                (v) => v.status !== "Paid"
              ).length}
          </p>
          <p className="text-sm text-gray-500">
            {formatCurrency(
              mockData.projectExpenses.raBills
                .filter((r) => r.status !== "Paid")
                .reduce((s, r) => s + r.totalAmount, 0) +
                mockData.projectExpenses.vendorInvoices
                  .filter((v) => v.status !== "Paid")
                  .reduce((s, v) => s + v.totalAmount, 0)
            )}{" "}
            pending
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <SubTabButton
              id="purchaseOrders"
              label="Purchase Orders"
              icon={FileText}
              activeSubTab={activeExpenseSubTab}
              setActiveSubTab={setActiveExpenseSubTab}
            />
            <SubTabButton
              id="raBills"
              label="RA Bills"
              icon={Clock}
              activeSubTab={activeExpenseSubTab}
              setActiveSubTab={setActiveExpenseSubTab}
            />
            <SubTabButton
              id="vendorInvoices"
              label="Vendor Invoices"
              icon={Receipt}
              activeSubTab={activeExpenseSubTab}
              setActiveSubTab={setActiveExpenseSubTab}
            />
          </nav>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            {activeExpenseSubTab === "purchaseOrders" && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      P.O. ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Delivery Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.projectExpenses.purchaseOrders.map((po) => (
                    <tr key={po.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">
                        {po.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {po.projectName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {po.projectId}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {po.vendorName}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        {formatCurrency(po.totalAmount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {po.expectedDeliveryDate}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            po.status
                          )}`}
                        >
                          {po.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeExpenseSubTab === "raBills" && (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      RA ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Contractor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Work Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Bill Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.projectExpenses.raBills.map((ra) => (
                    <tr key={ra.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-green-600">
                        {ra.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {ra.projectName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {ra.projectId}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {ra.contractorName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {ra.contractorId}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-800">
                          {ra.workStage}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        {formatCurrency(ra.totalAmount)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            ra.status
                          )}`}
                        >
                          {ra.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </button>
                          {ra.status === "Verified" && (
                            <button className="text-green-600 hover:text-green-800">
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeExpenseSubTab === "vendorInvoices" && (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Invoice ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockData.projectExpenses.vendorInvoices.map((vi) => (
                    <tr key={vi.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-purple-600">
                        {vi.invoiceNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {vi.projectName}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {vi.projectId}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {vi.vendorName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {vi.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        {formatCurrency(vi.totalAmount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {vi.dueDate}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            vi.status
                          )}`}
                        >
                          {vi.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Payments & Collections
        </h2>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
            <ArrowUp className="h-4 w-4 mr-2" />
            Record Incoming
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700">
            <ArrowDown className="h-4 w-4 mr-2" />
            Record Outgoing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Payments */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Incoming Payments (Collections)
            </h3>
            <ArrowUp className="h-6 w-6 text-green-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Payer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockData.payments.incoming.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {payment.payerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {payment.propertyName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          payment.sourceType
                        )}`}
                      >
                        {payment.sourceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Outgoing Payments */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Outgoing Payments (Payouts)
            </h3>
            <ArrowDown className="h-6 w-6 text-red-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Payee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockData.payments.outgoing.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {payment.payeeName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {payment.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          payment.paymentType
                        )}`}
                      >
                        {payment.paymentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Financial Reports & Analytics
        </h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
          <Download className="h-4 w-4 mr-2" />
          Export All Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-emerald-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Revenue Analysis
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Breakdown of all incoming revenue streams.
          </p>
          <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">
            Generate Revenue Report →
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <CreditCard className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Expense Analysis
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Project-wise expense breakdown and budget tracking.
          </p>
          <button className="text-red-600 hover:text-red-800 font-medium text-sm">
            Generate Expense Report →
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Profitability Analysis
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Project profitability, ROI, and margin calculations.
          </p>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Generate Profitability Report →
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Commission Reports
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Broker-wise commission payouts and performance.
          </p>
          <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
            Generate Commission Report →
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Status Reports
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Outstanding payments, collections, and aging analysis.
          </p>
          <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
            Generate Payment Report →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Revenue Trend
          </h3>
          <div className="space-y-3">
            {mockData.reports.monthlyRevenue.map((month, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span className="text-sm text-gray-600">{month.month}</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(
                    month.sales +
                      month.rentals +
                      month.auctions +
                      month.mortgages
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Project Profitability
          </h3>
          <div className="space-y-4">
            {mockData.reports.projectProfitability.map((project, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">
                    {project.projectName}
                  </h4>
                  <span
                    className={`text-sm font-bold ${
                      project.margin > 40
                        ? "text-green-600"
                        : project.margin > 20
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {project.margin}% margin
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-medium text-green-600">
                      {formatCurrency(project.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expenses</p>
                    <p className="font-medium text-red-600">
                      {formatCurrency(project.expenses)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Profit</p>
                    <p className="font-medium text-blue-600">
                      {formatCurrency(project.profit)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Finance Management
              </h1>
              <p className="text-gray-600 mt-1">
                Complete financial control for your real estate projects
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="all">All Projects</option>
                <option value="PROJ_001">Ocean View Project</option>
                <option value="PROJ_002">Skyline Villa</option>
                <option value="PROJ_003">Garden Heights</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisQuarter">This Quarter</option>
                <option value="thisYear">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            <nav className="flex space-x-1 overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "revenue", label: "Revenue", icon: DollarSign },
                { id: "commissions", label: "Commissions", icon: Users },
                {
                  id: "projectExpenses",
                  label: "Project Expenses",
                  icon: Building,
                },
                {
                  id: "payments",
                  label: "Payments & Collections",
                  icon: CreditCard,
                },
                { id: "reports", label: "Reports", icon: BarChart3 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="transition-all duration-300">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "revenue" && <RevenueTab />}
          {activeTab === "commissions" && <CommissionsTab />}
          {activeTab === "projectExpenses" && <ProjectExpensesTab />}
          {/* This logic was incorrect. Removing the redundant RA Bills Tab */}
          {/* {activeTab === "raBills" && <RABillsTab />} */}
          {activeTab === "payments" && <PaymentsTab />}
          {activeTab === "reports" && <ReportsTab />}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 space-y-3">
        {/* Placeholder for Quick Action Menu */}
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110">
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default FinanceModule;
