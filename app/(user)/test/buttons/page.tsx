import { Button, ScrollArea } from "@/components";
import msx from "@/styles/module.module.scss";
import { Home } from "lucide-react";

const sizeOptions = ["L", "M", "S"];
const modeOptions = ["solid", "outline", "text"];
const variantOptions = ["primary", "secondary", "accent"];
const statusOptions = ["ghost", "brand", "success", "fail", "warning", "info"];

// Generate all combinations
const generateCombinations = () => {
    const combinations: any = [];
    sizeOptions.forEach((size) => {
        modeOptions.forEach((mode) => {
            variantOptions.forEach((variant) => {
                statusOptions.forEach((status) => {
                    combinations.push({ size, mode, variant, status });
                });
            })
        });
    });
    return combinations;
};

const Buttons = () => {
    const combinations = generateCombinations();

    // Group combinations by mode
    const groupedByMode = modeOptions.map((mode) => ({
        mode,
        combinations: combinations.filter((combo: any) => combo.mode === mode),
    }));

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px" }}>
            {sizeOptions.map((size: any, sizeIndex) => (
                <div key={sizeIndex} style={{ marginBottom: "32px" }}>
                    {/* <h3 style={{ marginBottom: "16px", textTransform: "capitalize" }}>
                        {`Mode: ${modeGroup.mode}`}
                    </h3> */}
                    {groupedByMode.map((modeGroup: any) => (
                        <div key={modeGroup} style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "16px" }}>
                            {/* <h4 style={{ marginBottom: "8px", textTransform: "capitalize" }}>
                                {`Status: ${status}`}
                            </h4> */}
                            {
                                variantOptions.map((variant: any, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: "flex",
                                            // gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                                            justifyContent: "space-around",
                                            gap: "16px",
                                            padding: variant === "secondary" ? "16px" : "0px",
                                            backgroundColor: variant === "secondary" ? "var(--secondary-background-100)" : "var(--primary-background-100)"
                                        }}
                                    >
                                        {statusOptions.map((status: any) => (
                                            <Button
                                                key={`${modeGroup.mode}-${status}-${size}`}
                                                size={size}
                                                variant={variant}
                                                status={status}
                                                mode={modeGroup.mode}
                                            >
                                                <Home />
                                                Button
                                            </Button>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const Page = async () => {
    return (
        <div style={{ display: "flex" }}>
            <ScrollArea>
                <div className={msx["buttons"]} style={{ minWidth: "100%" }}>
                    <Buttons />
                </div>
            </ScrollArea>
        </div>
    );
};

export default Page;
