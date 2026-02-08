(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/.openclaw/workspace/shopizer-frontend/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "checkout",
    ()=>checkout,
    "createCart",
    ()=>createCart,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCart",
    ()=>getCart,
    "getCategories",
    ()=>getCategories,
    "getCategoryByFriendlyUrl",
    ()=>getCategoryByFriendlyUrl,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getOrder",
    ()=>getOrder,
    "getOrders",
    ()=>getOrders,
    "getProductByFriendlyUrl",
    ()=>getProductByFriendlyUrl,
    "getProductById",
    ()=>getProductById,
    "getProductBySku",
    ()=>getProductBySku,
    "getProducts",
    ()=>getProducts,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "getShippingQuotes",
    ()=>getShippingQuotes,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "register",
    ()=>register,
    "removeCartItem",
    ()=>removeCartItem,
    "searchAutocomplete",
    ()=>searchAutocomplete,
    "searchProducts",
    ()=>searchProducts,
    "updateCartItem",
    ()=>updateCartItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "http://192.168.56.1:8080") || 'http://192.168.56.1:8080';
// Create axios instance
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000
});
// Request interceptor to add auth token
apiClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('shopizer_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Response interceptor for error handling
apiClient.interceptors.response.use((response)=>response, (error)=>{
    if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('shopizer_token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
const getProducts = async (params)=>{
    const response = await apiClient.get('/api/v1/products', {
        params
    });
    return response.data;
};
const getProductById = async (id)=>{
    const response = await apiClient.get(`/api/v1/product/${id}`);
    return response.data;
};
const getProductByFriendlyUrl = async (friendlyUrl)=>{
    const response = await apiClient.get(`/api/v2/product/friendly/${friendlyUrl}`);
    return response.data;
};
const getProductBySku = async (sku)=>{
    const response = await apiClient.get(`/api/v2/product/${sku}`);
    return response.data;
};
const getProductsByCategory = async (categoryFriendlyUrl, params)=>{
    const response = await apiClient.get(`/api/v2/products/category/${categoryFriendlyUrl}`, {
        params
    });
    return response.data;
};
const getCategories = async (params)=>{
    const response = await apiClient.get('/api/v1/category', {
        params
    });
    return response.data;
};
const getCategoryByFriendlyUrl = async (friendlyUrl)=>{
    const response = await apiClient.get(`/api/v1/category/${friendlyUrl}`);
    return response.data;
};
const searchProducts = async (query, params)=>{
    const response = await apiClient.post('/api/v1/search', {
        query,
        count: params?.count || 20,
        start: params?.start || 0
    });
    return response.data;
};
const searchAutocomplete = async (query)=>{
    const response = await apiClient.post('/api/v1/search/autocomplete', {
        query,
        count: 10,
        start: 0
    });
    return response.data.values || [];
};
const createCart = async (item)=>{
    const response = await apiClient.post('/api/v1/cart', item);
    return response.data;
};
const getCart = async (cartCode)=>{
    const response = await apiClient.get(`/api/v1/cart/${cartCode}`);
    return response.data;
};
const addToCart = async (cartCode, item)=>{
    const response = await apiClient.put(`/api/v1/cart/${cartCode}`, item);
    return response.data;
};
const updateCartItem = async (cartCode, productSku, quantity)=>{
    const response = await apiClient.put(`/api/v1/cart/${cartCode}`, {
        product: productSku,
        quantity
    });
    return response.data;
};
const removeCartItem = async (cartCode, itemId)=>{
    const response = await apiClient.delete(`/api/v1/cart/${cartCode}/product/${itemId}`);
    return response.data;
};
const getShippingQuotes = async (cartCode, address)=>{
    const response = await apiClient.get('/api/v1/checkout/shippingQuotes', {
        params: {
            cart: cartCode,
            ...address
        }
    });
    return response.data;
};
const checkout = async (checkoutData)=>{
    const response = await apiClient.post('/api/v1/checkout', checkoutData);
    return response.data;
};
const login = async (username, password)=>{
    const response = await apiClient.post('/api/v1/auth/token', {
        username,
        password
    });
    const { token } = response.data;
    if (token) {
        localStorage.setItem('shopizer_token', token);
    }
    return response.data;
};
const register = async (customer)=>{
    const response = await apiClient.post('/api/v1/customer/register', customer);
    return response.data;
};
const getCurrentUser = async ()=>{
    const response = await apiClient.get('/api/v1/customer/profile');
    return response.data;
};
const logout = ()=>{
    localStorage.removeItem('shopizer_token');
};
const getOrders = async (params)=>{
    const response = await apiClient.get('/api/v1/private/orders', {
        params
    });
    return response.data.orders || [];
};
const getOrder = async (orderId)=>{
    const response = await apiClient.get(`/api/v1/private/orders/${orderId}`);
    return response.data;
};
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/shopizer-frontend/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/shopizer-frontend/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript) <export * as Slot>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__["Slot"].Root : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/.openclaw/workspace/shopizer-frontend/components/ui/button.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/shopizer-frontend/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-accent animate-pulse rounded-md", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/.openclaw/workspace/shopizer-frontend/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/shopizer-frontend/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript) <export * as Slot>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
            ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
            link: "text-primary underline-offset-4 [a&]:hover:underline"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__["Slot"].Root : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        "data-variant": variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/.openclaw/workspace/shopizer-frontend/components/ui/badge.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/shopizer-frontend/stores/cart.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useCartStore",
    ()=>useCartStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/lib/api.ts [app-client] (ecmascript)");
;
;
;
const useCartStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        cart: null,
        cartCode: null,
        isLoading: false,
        error: null,
        itemCount: 0,
        fetchCart: async ()=>{
            const { cartCode } = get();
            if (!cartCode) return;
            set({
                isLoading: true,
                error: null
            });
            try {
                const cart = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCart"])(cartCode);
                set({
                    cart,
                    itemCount: cart.products?.reduce((sum, item)=>sum + item.quantity, 0) || 0
                });
            } catch (error) {
                set({
                    error: 'Failed to fetch cart'
                });
                console.error('Fetch cart error:', error);
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        addItem: async (productSku, quantity, attributes)=>{
            const { cartCode, cart } = get();
            set({
                isLoading: true,
                error: null
            });
            try {
                let newCart;
                if (!cartCode) {
                    // No cart exists - create new cart with POST /api/v1/cart
                    newCart = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCart"])({
                        product: productSku,
                        quantity,
                        attributes
                    });
                    // Extract and store the cart code from response
                    set({
                        cartCode: newCart.code
                    });
                } else {
                    // Cart exists - check if product already in cart
                    const existingItem = cart?.products?.find((item)=>item.sku === productSku);
                    if (existingItem) {
                        // Product already exists - update quantity (current + adding)
                        const newQuantity = existingItem.quantity + quantity;
                        newCart = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCartItem"])(cartCode, existingItem.sku, newQuantity);
                    } else {
                        // Product doesn't exist - add to existing cart with PUT /api/v1/cart/{code}
                        newCart = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToCart"])(cartCode, {
                            product: productSku,
                            quantity,
                            attributes
                        });
                    }
                }
                set({
                    cart: newCart,
                    itemCount: newCart.products?.reduce((sum, item)=>sum + item.quantity, 0) || 0
                });
            } catch (error) {
                set({
                    error: 'Failed to add item to cart'
                });
                console.error('Add to cart error:', error);
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        updateItem: async (itemId, quantity)=>{
            const { cartCode, cart } = get();
            if (!cartCode) return;
            // Find the item in cart to get its SKU
            const item = cart?.products?.find((p)=>p.id === itemId);
            if (!item) return;
            if (quantity <= 0) {
                await get().removeItem(itemId);
                return;
            }
            set({
                isLoading: true,
                error: null
            });
            try {
                const updatedCart = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCartItem"])(cartCode, item.sku, quantity);
                set({
                    cart: updatedCart,
                    itemCount: updatedCart.products?.reduce((sum, item)=>sum + item.quantity, 0) || 0
                });
            } catch (error) {
                set({
                    error: 'Failed to update item'
                });
                console.error('Update cart item error:', error);
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        removeItem: async (itemId)=>{
            const { cartCode } = get();
            if (!cartCode) return;
            set({
                isLoading: true,
                error: null
            });
            try {
                const cart = await (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeCartItem"])(cartCode, itemId);
                set({
                    cart,
                    itemCount: cart.products?.reduce((sum, item)=>sum + item.quantity, 0) || 0
                });
            } catch (error) {
                set({
                    error: 'Failed to remove item'
                });
                console.error('Remove cart item error:', error);
            } finally{
                set({
                    isLoading: false
                });
            }
        },
        clearCart: ()=>{
            // Server-side cart persists but we clear local state
            set({
                cart: null,
                cartCode: null,
                itemCount: 0,
                error: null
            });
        },
        getTotalItems: ()=>{
            return get().itemCount;
        },
        getCartTotal: ()=>{
            const { cart } = get();
            return cart?.total || 0;
        }
    }), {
    name: 'shopizer-cart',
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    partialize: (state)=>({
            cartCode: state.cartCode
        })
}));
const __TURBOPACK__default__export__ = useCartStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/shopizer-frontend/hooks/useCart.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$stores$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/stores/cart.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useCart() {
    _s();
    const { cart, cartCode, isLoading, error, itemCount, fetchCart, addItem, updateItem, removeItem, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$stores$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[addToCart]": async (product, quantity = 1, selectedOptions)=>{
            if (!product.sku) {
                console.error('Product has no SKU');
                return;
            }
            // Convert selected options to attributes format
            const attributes = selectedOptions ? Object.entries(selectedOptions).map({
                "useCart.useCallback[addToCart]": ([code, value])=>({
                        code,
                        value
                    })
            }["useCart.useCallback[addToCart]"]) : undefined;
            await addItem(product.sku, quantity, attributes);
        }
    }["useCart.useCallback[addToCart]"], [
        addItem
    ]);
    const updateQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[updateQuantity]": async (itemId, quantity)=>{
            await updateItem(itemId, quantity);
        }
    }["useCart.useCallback[updateQuantity]"], [
        updateItem
    ]);
    const removeFromCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[removeFromCart]": async (itemId)=>{
            await removeItem(itemId);
        }
    }["useCart.useCallback[removeFromCart]"], [
        removeItem
    ]);
    const getItemQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[getItemQuantity]": (productSku)=>{
            const item = cart?.products?.find({
                "useCart.useCallback[getItemQuantity]": (p)=>p.sku === productSku
            }["useCart.useCallback[getItemQuantity]"]);
            return item?.quantity || 0;
        }
    }["useCart.useCallback[getItemQuantity]"], [
        cart
    ]);
    const isInCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCart.useCallback[isInCart]": (productSku)=>{
            return cart?.products?.some({
                "useCart.useCallback[isInCart]": (p)=>p.sku === productSku
            }["useCart.useCallback[isInCart]"]) || false;
        }
    }["useCart.useCallback[isInCart]"], [
        cart
    ]);
    const cartTotal = cart?.total || 0;
    const cartSubtotal = cart?.subtotal || 0;
    return {
        cart,
        cartCode,
        isLoading,
        error,
        itemCount,
        cartTotal,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        getItemQuantity,
        isInCart,
        clearCart,
        refreshCart: fetchCart
    };
}
_s(useCart, "Z7uyLJpEOoPyY8MzktMG/IPnKtg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$stores$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
const __TURBOPACK__default__export__ = useCart;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function ProductPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const slug = params.slug;
    const { addToCart, isInCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [addingToCart, setAddingToCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Try to fetch by friendly URL first, fallback to ID if numeric
    const isNumeric = /^\d+$/.test(slug);
    const { data: product, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "product",
            slug
        ],
        queryFn: {
            "ProductPage.useQuery": async ()=>{
                if (isNumeric) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(parseInt(slug, 10));
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductByFriendlyUrl"])(slug);
            }
        }["ProductPage.useQuery"]
    });
    const handleAddToCart = async ()=>{
        if (!product) return;
        setAddingToCart(true);
        try {
            await addToCart(product, quantity);
            __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Added to cart", {
                description: `${product.name} (${quantity})`
            });
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to add to cart");
        } finally{
            setAddingToCart(false);
        }
    };
    const imageUrl = product?.images?.[0]?.url ? `${"TURBOPACK compile-time value", "http://192.168.56.1:8080"}${product.images[0].url}` : "/placeholder-product.png";
    const displayPrice = product?.finalPrice || product?.originalPrice || `${product?.price}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-stone-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between h-14",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-lg tracking-tight",
                                children: "FREEDOM THREADS"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cart",
                                className: "p-2 hover:bg-stone-200 rounded-full transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "aspect-square w-full bg-stone-200"
                        }, void 0, false, {
                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                            lineNumber: 90,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-8 w-3/4 bg-stone-200"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-6 w-1/3 bg-stone-200"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-24 w-full bg-stone-200"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-12 w-full bg-stone-200"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-stone-600",
                            children: "Product not found."
                        }, void 0, false, {
                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "mt-4 inline-block text-stone-900 underline underline-offset-4",
                            children: "Back to home"
                        }, void 0, false, {
                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this) : product ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-square bg-stone-100 rounded-lg overflow-hidden",
                            children: [
                                product.images?.[0] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: imageUrl,
                                    alt: product.name,
                                    fill: true,
                                    sizes: "(max-width: 768px) 100vw, 50vw",
                                    className: "object-cover",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 113,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full flex items-center justify-center text-stone-400",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "No image available"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 17
                                }, this),
                                product.discounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    className: "absolute top-4 left-4 bg-stone-900 text-stone-50",
                                    children: "SALE"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-semibold text-stone-900",
                                            children: product.name
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-stone-700",
                                            children: displayPrice
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this),
                                product.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-stone-600 leading-relaxed",
                                    children: product.description
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-stone-700",
                                            children: "Quantity:"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center border border-stone-200 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "p-2 hover:bg-stone-100 transition-colors disabled:opacity-50",
                                                    onClick: ()=>setQuantity(Math.max(1, quantity - 1)),
                                                    disabled: quantity <= 1,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-12 text-center font-medium",
                                                    children: quantity
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "p-2 hover:bg-stone-100 transition-colors",
                                                    onClick: ()=>setQuantity(quantity + 1),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "w-full h-12 bg-stone-900 hover:bg-stone-800 text-stone-50",
                                    onClick: handleAddToCart,
                                    disabled: !product.available || addingToCart,
                                    children: addingToCart ? "Adding..." : !product.available ? "Sold Out" : isInCart(product.sku) ? "Add More to Cart" : "Add to Cart"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-4 border-t border-stone-200 space-y-2 text-sm text-stone-600",
                                    children: [
                                        product.sku && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: "SKU:"
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                product.sku
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this),
                                        product.quantity > 0 && product.quantity < 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-amber-600",
                                            children: [
                                                "Only ",
                                                product.quantity,
                                                " left in stock"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/products/[slug]/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(ProductPage, "MFNQhQDL/7odzh9C6YxRhQB+KoQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = ProductPage;
var _c;
__turbopack_context__.k.register(_c, "ProductPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_openclaw_workspace_shopizer-frontend_a693df87._.js.map