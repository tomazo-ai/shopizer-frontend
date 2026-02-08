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
"[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.openclaw/workspace/shopizer-frontend/node_modules/next/image.js [app-client] (ecmascript)");
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
function CartPage() {
    _s();
    const { cart, isLoading, itemCount, cartTotal, updateQuantity, removeFromCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const handleQuantityChange = async (item, newQuantity)=>{
        if (newQuantity < 1) return;
        await updateQuantity(item.id, newQuantity);
    };
    const handleRemove = async (item)=>{
        await removeFromCart(item.id);
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${item.productName} removed from cart`);
    };
    const subtotal = cart?.subtotal || 0;
    const displaySubtotal = cart?.displaySubTotal || `$${subtotal.toFixed(2)}`;
    const displayTotal = cart?.displayTotal || `$${cartTotal.toFixed(2)}`;
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
                                className: "font-semibold text-lg tracking-tight",
                                children: "FREEDOM THREADS"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm text-stone-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            itemCount,
                                            " ",
                                            itemCount === 1 ? 'item' : 'items'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    "Continue Shopping"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-semibold text-stone-900",
                                children: "Shopping Cart"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    isLoading ? /* Loading State */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-4",
                                children: Array.from({
                                    length: 3
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 p-4 bg-white rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                className: "w-24 h-24 bg-stone-200"
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-5 w-3/4 bg-stone-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-4 w-1/4 bg-stone-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-8 w-32 bg-stone-200"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-64 w-full bg-stone-200"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this) : !cart?.products?.length ? /* Empty State */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                    className: "w-10 h-10 text-stone-400"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-stone-900 mb-2",
                                children: "Your cart is empty"
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-stone-600 mb-6 max-w-sm mx-auto",
                                children: "Looks like you haven't added anything to your cart yet."
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "bg-stone-900 hover:bg-stone-800 text-white",
                                    children: "Start Shopping"
                                }, void 0, false, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this) : /* Cart Content */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-4",
                                children: cart.products.map((item)=>{
                                    const imageUrl = item.image?.url ? `${"TURBOPACK compile-time value", "http://192.168.56.1:8080"}${item.image.url}` : item.images?.[0]?.url ? `${"TURBOPACK compile-time value", "http://192.168.56.1:8080"}${item.images[0].url}` : "/placeholder-product.png";
                                    const itemPrice = item.finalPrice || `$${item.price?.toFixed(2) || '0.00'}`;
                                    const itemTotal = item.displaySubTotal || `$${item.subTotal?.toFixed(2) || '0.00'}`;
                                    const productLink = `/products/${item.sku}`;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 p-4 bg-white rounded-lg border border-stone-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: productLink,
                                                className: "shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-24 h-24 bg-stone-100 rounded-md overflow-hidden relative",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: imageUrl,
                                                        alt: item.productName || "Product",
                                                        fill: true,
                                                        sizes: "96px",
                                                        className: "object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: productLink,
                                                                        className: "font-medium text-stone-900 hover:text-stone-600 transition-colors line-clamp-1",
                                                                        children: item.productName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                        lineNumber: 137,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-stone-600 mt-1",
                                                                        children: itemPrice
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                        lineNumber: 143,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    item.attributes && item.attributes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-stone-500 mt-1",
                                                                        children: item.attributes.map((attr, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    attr.option?.name,
                                                                                    ": ",
                                                                                    attr.optionValue?.name,
                                                                                    idx < item.attributes.length - 1 && ", "
                                                                                ]
                                                                            }, attr.id, true, {
                                                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                                lineNumber: 149,
                                                                                columnNumber: 33
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                        lineNumber: 147,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                lineNumber: 136,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleRemove(item),
                                                                className: "p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors",
                                                                "aria-label": `Remove ${item.productName} from cart`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                    lineNumber: 164,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                lineNumber: 159,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mt-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleQuantityChange(item, item.quantity - 1),
                                                                        disabled: item.quantity <= 1,
                                                                        className: "w-8 h-8 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                            className: "w-3 h-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                            lineNumber: 177,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-8 text-center text-sm font-medium",
                                                                        children: item.quantity
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleQuantityChange(item, item.quantity + 1),
                                                                        className: "w-8 h-8 flex items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                            className: "w-3 h-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                            lineNumber: 186,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                        lineNumber: 182,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-stone-900",
                                                                children: itemTotal
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                lineNumber: 191,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-lg border border-stone-100 p-6 sticky top-24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-stone-900 mb-4",
                                            children: "Order Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-stone-600",
                                                            children: "Subtotal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-stone-900",
                                                            children: displaySubtotal
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-stone-600",
                                                            children: "Shipping"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-stone-500",
                                                            children: "Calculated at checkout"
                                                        }, void 0, false, {
                                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-t border-stone-100 pt-3 mt-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-stone-900",
                                                                children: "Total"
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-stone-900",
                                                                children: displayTotal
                                                            }, void 0, false, {
                                                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            className: "w-full bg-stone-900 hover:bg-stone-800 text-white h-12",
                                            onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Checkout coming soon!"),
                                            children: "Proceed to Checkout"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            className: "block text-center text-sm text-stone-600 hover:text-stone-900 mt-4 transition-colors",
                                            children: "Continue Shopping"
                                        }, void 0, false, {
                                            fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "border-t border-stone-200 py-6 px-4 sm:px-6 lg:px-8 mt-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-stone-500",
                        children: "© 2025 Freedom Threads. All rights reserved."
                    }, void 0, false, {
                        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/.openclaw/workspace/shopizer-frontend/app/cart/page.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(CartPage, "IoYXAWtaioH2Z5R8/5ctMRTImaM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f2e$openclaw$2f$workspace$2f$shopizer$2d$frontend$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = CartPage;
var _c;
__turbopack_context__.k.register(_c, "CartPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_openclaw_workspace_shopizer-frontend_7dfbb05d._.js.map