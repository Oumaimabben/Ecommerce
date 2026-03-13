import { useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  Download,
  Eye,
  ChevronRight,
  Box,
  PackageCheck,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface TrackingStep {
  status: string;
  date: string;
  time: string;
  location: string;
  description: string;
  completed: boolean;
}

interface Order {
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  estimatedDelivery: string;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber: string;
  carrier: string;
  tracking: TrackingStep[];
}

const OrderTrackingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Données de démonstration
  const mockOrder: Order = {
    orderNumber: "ORD-2024-12345",
    date: "15 Février 2024",
    status: "shipped",
    estimatedDelivery: "18 Février 2024",
    total: 1250.0,
    trackingNumber: "TN123456789",
    carrier: "Aramex Tunisie",
    shippingAddress: "123 Avenue Habib Bourguiba, Tunis 1000, Tunisie",
    items: [
      {
        id: "1",
        name: "Kit de phares LED pour Toyota",
        quantity: 2,
        price: 450.0,
        image: "🚗",
      },
      {
        id: "2",
        name: "Batterie 12V 70Ah",
        quantity: 1,
        price: 350.0,
        image: "🔋",
      },
    ],
    tracking: [
      {
        status: "Commande confirmée",
        date: "15 Fév 2024",
        time: "10:30",
        location: "Tunis, Tunisie",
        description: "Votre commande a été confirmée et est en préparation",
        completed: true,
      },
      {
        status: "En préparation",
        date: "15 Fév 2024",
        time: "14:45",
        location: "Entrepôt Tunis",
        description: "Vos articles sont en cours de préparation",
        completed: true,
      },
      {
        status: "Expédiée",
        date: "16 Fév 2024",
        time: "09:15",
        location: "Centre de tri Tunis",
        description: "Votre colis a été expédié",
        completed: true,
      },
      {
        status: "En transit",
        date: "16 Fév 2024",
        time: "16:20",
        location: "En route vers la destination",
        description: "Votre colis est en cours de livraison",
        completed: true,
      },
      {
        status: "Livraison prévue",
        date: "18 Fév 2024",
        time: "Estimé",
        location: "Tunis, Tunisie",
        description: "Livraison prévue aujourd'hui",
        completed: false,
      },
    ],
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simuler une recherche
    setTimeout(() => {
      setSelectedOrder(mockOrder);
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-6 h-6" />;
      case "shipped":
        return <Truck className="w-6 h-6" />;
      case "processing":
        return <Package className="w-6 h-6" />;
      default:
        return <Clock className="w-6 h-6" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Livrée";
      case "shipped":
        return "Expédiée";
      case "processing":
        return "En préparation";
      default:
        return "En attente";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              Suivi de commande
            </h1>
            <p className="text-xl text-red-100">
              Suivez votre commande en temps réel
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    placeholder="Entrez votre numéro de commande ou email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Recherche...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Rechercher
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p>
                  Vous pouvez utiliser votre numéro de commande ou l'adresse
                  email associée à votre commande
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Order Details */}
      {selectedOrder && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Order Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedOrder.orderNumber}
                  </h2>
                  <span
                    className={`${getStatusColor(
                      selectedOrder.status
                    )} text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span>Commandé le {selectedOrder.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-red-600" />
                    <span>Livraison prévue le {selectedOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all">
                  <Download className="w-5 h-5" />
                  Facture
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all">
                  <Phone className="w-5 h-5" />
                  Support
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tracking Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Suivi de livraison
                  </h3>
                  <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold">
                    {selectedOrder.trackingNumber}
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedOrder.tracking.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Connector line */}
                      {index < selectedOrder.tracking.length - 1 && (
                        <div
                          className={`absolute left-6 top-14 w-0.5 h-full ${
                            step.completed ? "bg-red-600" : "bg-gray-200"
                          }`}
                        ></div>
                      )}

                      <div className="flex gap-4">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-400"
                          } shadow-lg relative z-10`}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Clock className="w-6 h-6" />
                          )}
                        </div>

                        {/* Content */}
                        <div
                          className={`flex-grow ${
                            step.completed ? "bg-red-50" : "bg-gray-50"
                          } rounded-xl p-6 ${
                            !step.completed && "border-2 border-dashed border-gray-300"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4
                              className={`font-bold text-lg ${
                                step.completed ? "text-gray-900" : "text-gray-500"
                              }`}
                            >
                              {step.status}
                            </h4>
                            <div className="text-right">
                              <div
                                className={`text-sm font-semibold ${
                                  step.completed ? "text-red-600" : "text-gray-400"
                                }`}
                              >
                                {step.date}
                              </div>
                              <div className="text-xs text-gray-500">
                                {step.time}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span>{step.location}</span>
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carrier Info */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-lg shadow">
                      <Truck className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Transporteur: {selectedOrder.carrier}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Numéro de suivi: {selectedOrder.trackingNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Box className="w-6 h-6 text-red-600" />
                  Résumé de commande
                </h3>

                <div className="space-y-4 mb-6">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-3xl shadow-md">
                        {item.image}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Qté: {item.quantity}
                          </span>
                          <span className="font-bold text-red-600">
                            {item.price.toFixed(2)} TND
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{selectedOrder.total.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="text-green-600 font-semibold">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-red-600">
                      {selectedOrder.total.toFixed(2)} TND
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-red-600" />
                  Adresse de livraison
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Besoin d'aide ?</h3>
                <p className="text-red-100 mb-6">
                  Notre équipe est là pour vous aider
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-white text-red-600 px-4 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Phone className="w-5 h-5" />
                    (+216) 71 123 456
                  </button>
                  <button className="w-full bg-white/10 backdrop-blur-sm border-2 border-white text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" />
                    support@autoparts.tn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      {!selectedOrder && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Comment trouver mon numéro de commande ?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Votre numéro de commande se trouve dans l'email de confirmation
              que vous avez reçu après votre achat. Il commence généralement par
              "ORD-".
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Vérifiez vos emails
                </h4>
                <p className="text-gray-600 text-sm">
                  Consultez l'email de confirmation de commande
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Mon compte</h4>
                <p className="text-gray-600 text-sm">
                  Connectez-vous pour voir toutes vos commandes
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Contactez-nous
                </h4>
                <p className="text-gray-600 text-sm">
                  Notre équipe peut vous aider à retrouver votre commande
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;