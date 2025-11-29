import React from 'react';
import Image from 'next/image';

interface Barang {
    barangID: string;
    nama: string;
    harga: number;
    gambar: string;
    stok?: number;
}

interface DetailKartu {
    barang: Barang;
    onClick?: (barang: Barang) => void;
    className?: string;
    showQty?: boolean;
    isActive?: boolean;
}

export default function Kartu({
    barang,
    onClick,
    className = '',
    showQty = false,
    isActive = false
}: DetailKartu) {
    const handleClick = () => {
        if (onClick) {
            onClick(barang);
        }
    };

    return (
        <div
            className={`card-container relative border border-gray-200 shadow-md transition-all duration-250 ease-in-out 
                        cursor-pointer hover:shadow-lg hover:border-B21011 active:scale-95 h-50 w-80 flex-shrink-0
                        ${isActive ? 'border-FFBA01 shadow-lg' : ''}
                        ${className}`}
            onClick={handleClick}
        >
            <div
                style={{
                    backgroundColor: '#cb2626',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
                }}
                className="absolute inset-0 z-0"
            ></div>

            <div
                style={{
                    backgroundColor: '#840505',
                    clipPath: 'polygon(0 0, 80% 0, 95% 100%, 0% 100%)'
                }}
                className="absolute inset-0 z-10"
            ></div>

            <div
                style={{
                    backgroundColor: '#9E172F',
                    clipPath: 'polygon(0 0, 100% 0%, 90% 50%, 0% 100%)'
                }}
                className="absolute top-0 left-0 w-3/4 h-10 z-20"
            ></div>

            <div
                style={{
                    backgroundColor: '#970505',
                    clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0% 100%)'
                }}
                className="absolute top-0 left-0 w-2/3 h-10 flex items-center px-3 z-30"
            >
                <h3
                    style={{ color: 'white' }}
                    className="product-name font-bold text-sm truncate"
                >
                    {barang.nama}
                </h3>
            </div>

            <div style={{
                backgroundColor: '#e90707',
                clipPath: 'polygon(0 0, 80% 80%, 100% 100%, 0% 100%)'
            }}
                className="absolute bottom-0 left-0 w-1/1 h-15 flex items-center px-3 z-30"></div>

            <div className="card-content absolute inset-0 pt-8 pb-3 px-3 flex flex-col z-40">
                <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0">
                        <div className="image-container relative">
                            <Image
                                src={barang.gambar}
                                alt={barang.nama}
                                width={60}
                                height={60}
                                className="w-30 h-30 object-contain rounded border border-gray-300 bg-white"
                            />
                        </div>
                    </div>

                    <div className="info flex-1 flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span
                                style={{ color: 'white' }}
                                className="id-label text-xs font-medium"
                            >
                                ID:
                            </span>
                            <span
                                style={{
                                    backgroundColor: '#840505',
                                    color: 'white'
                                }}
                                className="id-value px-2 py-1 rounded text-xs font-bold"
                            >
                                {barang.barangID}
                            </span>
                        </div>

                        <div className="price-section">
                            <div
                                style={{ color: 'white' }}
                                className="price-text font-bold text-lg leading-tight"
                            >
                                Rp {barang.harga.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buat tampilin stok barang biar di inventory keliatan */}
                {showQty && barang.stok !== undefined && (
                    <div className="stock-container mt-2 flex items-center gap-3">
                        <span
                            style={{ color: 'white' }}
                            className="stock-label text-xs font-medium"
                        >
                            Stok:
                        </span>
                        <span
                            style={{
                                backgroundColor: '#b91010',
                                color: 'white'
                            }}
                            className="stock-value px-3 py-1 rounded text-xs font-bold"
                        >
                            {barang.stok} unit
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
