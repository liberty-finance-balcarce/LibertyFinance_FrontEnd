import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Instrumento } from "../types/instrumento-financiero";

export interface CarritoItem extends Instrumento {
    cantidad: number;
}

interface CarritoContextType {
    items: CarritoItem[];
    agregarItem: (instrumento: Instrumento, cantidad?: number) => void;
    quitarItem: (id: number) => void;
    actualizarCantidad: (id: number, cantidad: number) => void;
    vaciarCarrito: () => void;
    total: number;
}

export const CarritoContext = createContext<CarritoContextType | null>(null);

interface Props {
    children: ReactNode;
}

const CANTIDAD_MINIMA = 1;

export function CarritoProvider({ children }: Props) {
    const [items, setItems] = useState<CarritoItem[]>(() => {
        const saved = localStorage.getItem("carrito");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(items));
    }, [items]);

    const agregarItem = (instrumento: Instrumento, cantidad: number = CANTIDAD_MINIMA) => {
        setItems((prev) => {
            const yaExiste = prev.some(
                (i) => i.id_instrumento === instrumento.id_instrumento
            );
            if (yaExiste) return prev;
            return [...prev, { ...instrumento, cantidad }];
        });
    };

    const quitarItem = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id_instrumento !== id));
    };

    const actualizarCantidad = (id: number, cantidad: number) => {
        if (cantidad < CANTIDAD_MINIMA) return;

        setItems((prev) =>
            prev.map((i) =>
                i.id_instrumento === id ? { ...i, cantidad } : i
            )
        );
    };

    const vaciarCarrito = () => setItems([]);

    const total = items.reduce(
        (acc, i) => acc + i.precio_instrumento * i.cantidad,
        0
    );

    const value: CarritoContextType = {
        items,
        agregarItem,
        quitarItem,
        actualizarCantidad,
        vaciarCarrito,
        total,
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
}