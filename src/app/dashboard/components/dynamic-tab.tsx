import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX } from "react";

/**
 * Represents a single tab item in the DynamicTabs component.
 */
interface TabItem {
  /** The label displayed on the tab */
  label: string;
  /** Unique identifier for the tab (used as value) */
  value: string;
  /** The content to be rendered when this tab is active */
  content: React.ReactNode;
}

/**
 * Props for the DynamicTabs component.
 */
interface DynamicTabsProps {
  /** Array of tabs containing labels, values, and associated content */
  tabs: TabItem[];
}

/**
 * A reusable tab component that supports dynamic tab labels and content.
 *
 * @param {DynamicTabsProps} props - The component props
 * @returns {JSX.Element | null} The rendered tab component or null if no tabs are provided
 */
export default function DynamicTabs({
  tabs,
}: DynamicTabsProps): JSX.Element | null {
  if (tabs.length === 0) return null; // Handle the case where no tabs are provided

  return (
    <Tabs defaultValue={tabs[0].value} className="w-[400px]">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Tab Content */}
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
