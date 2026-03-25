import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0a0a",
                    borderRadius: 6,
                }}
            >
                <span
                    style={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#ffffff",
                        letterSpacing: "-0.5px",
                        lineHeight: 1,
                    }}
                >
                    MH_
                </span>
            </div>
        ),
        { ...size }
    );
}
