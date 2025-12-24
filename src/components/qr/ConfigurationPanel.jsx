import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs.jsx"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx"
import { Input } from "../ui/Input.jsx"
import { Label } from "../ui/Label.jsx"
import { Button } from "../ui/Button.jsx"
import { Link as LinkIcon, Wifi, UserSquare2, Type } from "lucide-react"

export function ConfigurationPanel({ text, onTextChange }) {
    // In a real app we'd handle complex state for WiFi/VCard here and convert to string
    // For now, we will keep it simple and just allow text editing, but layout the Tabs

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="url" className="w-full">
                        <TabsList className="w-full grid grid-cols-4 mb-6">
                            <TabsTrigger value="url" className="flex gap-2"><LinkIcon size={16} /> URL</TabsTrigger>
                            <TabsTrigger value="text" className="flex gap-2"><Type size={16} /> Text</TabsTrigger>
                            <TabsTrigger value="wifi" className="flex gap-2"><Wifi size={16} /> WiFi</TabsTrigger>
                            <TabsTrigger value="vcard" className="flex gap-2"><UserSquare2 size={16} /> Contact</TabsTrigger>
                        </TabsList>

                        <TabsContent value="url">
                            <Label>Website URL</Label>
                            <Input
                                placeholder="https://example.com"
                                value={text}
                                onChange={(e) => onTextChange(e.target.value)}
                            />
                        </TabsContent>

                        <TabsContent value="text">
                            <Label>Plain Text</Label>
                            <Input
                                placeholder="Enter your text here"
                                value={text}
                                onChange={(e) => onTextChange(e.target.value)}
                            />
                        </TabsContent>

                        <TabsContent value="wifi">
                            <div className="p-4 bg-yellow-50/50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
                                WiFi Generator coming soon. Using text mode for now.
                            </div>
                            <Input
                                className="mt-2"
                                placeholder="WIFI:S:MyNetwork;T:WPA;P:Password;;"
                                value={text}
                                onChange={(e) => onTextChange(e.target.value)}
                            />
                        </TabsContent>

                        <TabsContent value="vcard">
                            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl text-sm text-blue-800">
                                VCard Generator coming soon. Using text mode for now.
                            </div>
                            <Input
                                className="mt-2"
                                placeholder="BEGIN:VCARD..."
                                value={text}
                                onChange={(e) => onTextChange(e.target.value)}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
