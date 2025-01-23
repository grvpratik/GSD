import React from 'react';
import { 
  Lock, 
  PieChart, 
  Star, 
  Layers, 
  Shield, 
  Settings, 
  Zap, 
  Database 
} from 'lucide-react';

const featureIcons = {
  'must-have': Shield,
  'should-have': Settings,
  'nice-to-have': Star
};

interface FeatureProps {
    id: string;
    name: string;
    description: string;
    priority: string;
    complexity: number;
    type: "must-have" | "should-have" | "nice-to-have";
    icon: any;
}

const FeaturesAnalysis: React.FC = () => {
    const features: FeatureProps[] = [
        {
            id: '1',
            name: 'User Authentication',
            description: 'Secure login and registration system',
            priority: 'High',
            complexity: 7,
            type: 'must-have',
            icon: Lock
        },
        {
            id: '2',
            name: 'Dashboard Analytics',
            description: 'Comprehensive performance insights',
            priority: 'Medium',
            complexity: 6,
            type: 'should-have',
            icon: PieChart
        },
        {
            id: '3',
            name: 'Theme Customization',
            description: 'Optional dark and light modes',
            priority: 'Low',
            complexity: 3,
            type: 'nice-to-have',
            icon: Layers
        },
        {
            id: '4',
            name: 'Data Synchronization',
            description: 'Real-time cloud sync',
            priority: 'High',
            complexity: 8,
            type: 'must-have',
            icon: Database
        }
    ];

    const typeColors = {
        'must-have': 'bg-red-50 border-red-200',
        'should-have': 'bg-blue-50 border-blue-200',
        'nice-to-have': 'bg-green-50 border-green-200'
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(
                    features.reduce((acc, feature) => {
                        if (!acc[feature.type]) acc[feature.type] = [];
                        acc[feature.type].push(feature);
                        return acc;
                    }, {} as Record<string, FeatureProps[]>)
                ).map(([type, typeFeatures]) => (
                    <div 
                        key={type} 
                        className={`p-4 rounded-lg border ${typeColors[type as keyof typeof typeColors]}`}
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            {React.createElement(featureIcons[type as keyof typeof featureIcons], { 
                                className: "mr-2 text-gray-600",
                                size: 24 
                            })}
                            {type.replace('-', ' ').toUpperCase()}
                        </h2>
                        <div className="space-y-3">
                            {typeFeatures.map(feature => (
                                <div 
                                    key={feature.id} 
                                    className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                           
<feature.icon className="text-blue-600 mr-2" size={20} />
                                            <h3 className="font-semibold">{feature.name}</h3>
                                        </div>
                                        <span className={`
                                            px-2 py-1 rounded-full text-xs
                                            ${feature.priority === 'High' ? 'bg-red-100 text-red-800' : 
                                              feature.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-green-100 text-green-800'}
                                        `}>
                                            {feature.priority}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-blue-600 h-2.5 rounded-full" 
                                                style={{width: `${feature.complexity * 10}%`}}
                                            ></div>
                                        </div>
                                        <span className="ml-2 text-xs text-gray-500">
                                            {feature.complexity}/10
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesAnalysis;