
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Update your company information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="companyName" className="text-sm font-medium">
                            Company Name
                          </label>
                          <input
                            id="companyName"
                            type="text"
                            defaultValue="Acme Inc."
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="industry" className="text-sm font-medium">
                            Industry
                          </label>
                          <select
                            id="industry"
                            defaultValue="Technology"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          >
                            <option value="Technology">Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Retail">Retail</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="size" className="text-sm font-medium">
                            Company Size
                          </label>
                          <select
                            id="size"
                            defaultValue="50-250"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          >
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="50-250">50-250 employees</option>
                            <option value="250-1000">250-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium">
                            Primary Location
                          </label>
                          <input
                            id="location"
                            type="text"
                            defaultValue="San Francisco, CA"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Company Description
                        </label>
                        <textarea
                          id="description"
                          rows={3}
                          defaultValue="Acme Inc. is a technology company focused on SaaS products."
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button type="button">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>Connect your tools and services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: 'Slack',
                          description: 'Receive notifications and updates in your Slack workspace',
                          connected: true,
                          icon: (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.042 15.165C5.042 16.595 3.884 17.752 2.455 17.752C1.025 17.752 -0.133 16.595 -0.133 15.165C-0.133 13.736 1.025 12.578 2.455 12.578H5.042V15.165ZM6.38 15.165C6.38 13.736 7.538 12.578 8.967 12.578C10.397 12.578 11.555 13.736 11.555 15.165V21.677C11.555 23.107 10.397 24.265 8.967 24.265C7.538 24.265 6.38 23.107 6.38 21.677V15.165Z" transform="translate(0.133)" fill="#E01E5A"/>
                              <path d="M8.967 5.042C7.538 5.042 6.38 3.884 6.38 2.455C6.38 1.025 7.538 -0.133 8.967 -0.133C10.397 -0.133 11.555 1.025 11.555 2.455V5.042H8.967ZM8.967 6.38C10.397 6.38 11.555 7.538 11.555 8.967C11.555 10.397 10.397 11.555 8.967 11.555H2.455C1.025 11.555 -0.133 10.397 -0.133 8.967C-0.133 7.538 1.025 6.38 2.455 6.38H8.967Z" transform="translate(0.133)" fill="#36C5F0"/>
                              <path d="M19.09 8.967C19.09 7.538 20.248 6.38 21.677 6.38C23.107 6.38 24.265 7.538 24.265 8.967C24.265 10.397 23.107 11.555 21.677 11.555H19.09V8.967ZM17.752 8.967C17.752 10.397 16.595 11.555 15.165 11.555C13.736 11.555 12.578 10.397 12.578 8.967V2.455C12.578 1.025 13.736 -0.133 15.165 -0.133C16.595 -0.133 17.752 1.025 17.752 2.455V8.967Z" transform="translate(0.133)" fill="#2EB67D"/>
                              <path d="M15.165 19.09C16.595 19.09 17.752 20.248 17.752 21.677C17.752 23.107 16.595 24.265 15.165 24.265C13.736 24.265 12.578 23.107 12.578 21.677V19.09H15.165ZM15.165 17.752C13.736 17.752 12.578 16.595 12.578 15.165C12.578 13.736 13.736 12.578 15.165 12.578H21.677C23.107 12.578 24.265 13.736 24.265 15.165C24.265 16.595 23.107 17.752 21.677 17.752H15.165Z" transform="translate(0.133)" fill="#ECB22E"/>
                            </svg>
                          )
                        },
                        {
                          name: 'Jira',
                          description: 'Create tasks and track progress in Jira',
                          connected: true,
                          icon: (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.0045 0C5.37387 0 0 5.3779 0 12.0045C0 18.6311 5.37387 24.0091 12.0045 24.0091C18.6351 24.0091 24.0091 18.6311 24.0091 12.0045C24.0091 5.3779 18.6351 0 12.0045 0Z" fill="#2684FF" />
                              <path d="M11.9683 5.33203H11.9956L11.9878 5.33984L5.66925 11.6545L4.99219 14.0055L7.33917 13.3206L13.6617 7.00179L11.9683 5.33203Z" fill="white" />
                              <path d="M13.6615 7.00179L13.6537 7.0096L13.6615 7.00179C13.9261 7.26596 14.2069 7.54569 14.4955 7.83369C14.9827 8.32053 15.4855 8.8232 15.9571 9.34246C16.4287 9.86154 16.8769 10.3886 17.2848 10.9194C17.3965 11.0596 17.5065 11.2014 17.6149 11.3444L17.6149 11.3444L17.6151 11.3446L17.6153 11.3449L17.6154 11.345L17.6156 11.3452L17.6159 11.3455L17.617 11.3471L17.6209 11.3524L17.6365 11.3729L17.7003 11.4551L17.9518 11.7804L18.951 13.0539L19.4519 13.692L12.9978 20.1427L11.3196 18.4686L17.6486 12.1478L17.0188 11.3405L17.017 11.3381L16.9856 11.2982L11.3196 16.962L7.33899 13.3204L13.6615 7.00179Z" fill="url(#paint0_linear)" />
                              <defs>
                                <linearGradient id="paint0_linear" x1="13.3901" y1="13.5789" x2="8.61396" y2="8.88099" gradientUnits="userSpaceOnUse">
                                  <stop offset="0.0680226" stopColor="#0052CC" />
                                  <stop offset="0.953" stopColor="#2684FF" />
                                </linearGradient>
                              </defs>
                            </svg>
                          )
                        },
                        {
                          name: 'AWS',
                          description: 'Monitor your AWS cloud services for compliance',
                          connected: false,
                          icon: (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.9149 12.0328C6.9149 12.3859 6.9523 12.6747 7.0149 12.8979C7.0899 13.1211 7.1773 13.3554 7.2897 13.6013C7.3294 13.6794 7.3481 13.7553 7.3481 13.82C7.3481 13.9093 7.3006 13.9989 7.1992 14.0879L6.684 14.4623C6.6073 14.5175 6.5299 14.5449 6.4548 14.5449C6.3409 14.5449 6.2274 14.4868 6.1136 14.3735C6.0011 14.2166 5.9009 14.0501 5.8114 13.874C5.7219 13.6979 5.6327 13.5084 5.5432 13.3067C4.8728 14.1392 4.0154 14.5557 2.9709 14.5557C2.2384 14.5557 1.6553 14.3414 1.222 13.9143C0.7892 13.4868 0.5728 12.9277 0.5728 12.2405C0.5728 11.5039 0.8384 10.9003 1.3712 10.4362C1.9037 9.9721 2.6251 9.7399 3.5334 9.7399C3.7989 9.7399 4.0739 9.7596 4.3605 9.7931C4.6471 9.8266 4.9421 9.8784 5.2434 9.9405V9.3927C5.2434 8.8056 5.1219 8.3831 4.8789 8.1259C4.6348 7.8693 4.2206 7.7405 3.6375 7.7405C3.318 7.7405 2.9889 7.7809 2.6508 7.8644C2.3123 7.9478 1.9859 8.0581 1.6687 8.1969C1.5121 8.2693 1.3986 8.3042 1.3321 8.3146C1.2656 8.3255 1.214 8.3307 1.1774 8.3307C1.0263 8.3307 0.9507 8.2258 0.9507 8.0177V7.53C0.9507 7.3784 0.9667 7.2626 0.9981 7.1842C1.0297 7.1056 1.0894 7.0327 1.1774 6.9655C1.4944 6.7842 1.8803 6.6362 2.3356 6.5216C2.7908 6.4066 3.2695 6.3491 3.7715 6.3491C4.7142 6.3491 5.4067 6.5808 5.8465 7.0444C6.2856 7.508 6.5055 8.2086 6.5055 9.1487V12.0328H6.9149ZM3.617 13.2282C3.9265 13.2282 4.2443 13.1666 4.5723 13.0454C4.9003 12.924 5.1801 12.7279 5.4067 12.4603C5.5367 12.2996 5.6282 12.1248 5.6753 11.9318C5.7224 11.7387 5.7452 11.5027 5.7452 11.2232V11.1097C5.5293 11.063 5.3007 11.0236 5.0607 10.9929C4.8207 10.9616 4.5878 10.9459 4.3606 10.9459C3.796 10.9459 3.3759 11.0604 3.0998 11.2877C2.8238 11.5154 2.6856 11.8348 2.6856 12.2467C2.6856 12.6365 2.784 12.9281 2.983 13.124C3.1813 13.32 3.4594 13.4184 3.8216 13.4184L3.617 13.2282ZM10.4481 14.3777C10.2596 14.3777 10.1322 14.3452 10.0658 14.2789C9.9995 14.2177 9.946 14.0859 9.9035 13.8916L8.3086 7.1002C8.2661 6.9002 8.2452 6.7739 8.2452 6.7211C8.2452 6.573 8.3318 6.4991 8.5058 6.4991H9.1645C9.3641 6.4991 9.4985 6.532 9.5673 6.5985C9.6366 6.6646 9.6863 6.796 9.7376 6.9904L10.8785 12.5941L11.9037 6.9904C11.945 6.7904 11.9951 6.6592 12.0643 6.5985C12.1329 6.5378 12.269 6.4991 12.4579 6.4991H12.9909C13.1807 6.4991 13.3128 6.532 13.3908 6.5985C13.4676 6.6646 13.5205 6.7961 13.5553 6.9904L14.5931 12.6669L15.7714 6.9904C15.8228 6.7904 15.8828 6.6592 15.9519 6.5985C16.0205 6.5378 16.1502 6.4991 16.3404 6.4991H16.9741C17.1481 6.4991 17.2544 6.5682 17.2544 6.7069C17.2544 6.7542 17.2439 6.8018 17.2228 6.8598C17.2017 6.9183 17.1743 6.992 17.1358 7.0814L15.4834 13.8835C15.4409 14.0836 15.3878 14.2159 15.3214 14.2771C15.2549 14.3378 15.1364 14.3691 14.9676 14.3691H14.3963C14.2064 14.3691 14.0737 14.3366 13.9969 14.2708C13.9201 14.2051 13.8678 14.0734 13.833 13.873L12.8181 8.5009L11.8136 13.8685C11.7783 14.0685 11.7254 14.2004 11.6495 14.2665C11.5733 14.3324 11.4381 14.3646 11.249 14.3646H10.4481V14.3777ZM21.1478 14.5558C20.6712 14.5558 20.1968 14.5001 19.7246 14.3887C19.2529 14.2771 18.8695 14.1469 18.5779 13.9983C18.3988 13.9039 18.2778 13.804 18.2246 13.7049C18.1717 13.6057 18.1448 13.4974 18.1448 13.3826V12.8861C18.1448 12.6786 18.2288 12.5732 18.3946 12.5732C18.4629 12.5732 18.5317 12.5873 18.6014 12.616C18.6712 12.6444 18.7685 12.6838 18.893 12.7332C19.2311 12.8861 19.5858 13.0074 19.9571 13.0983C20.3288 13.1889 20.6923 13.2342 21.0477 13.2342C21.5511 13.2342 21.9427 13.1398 22.2205 12.9522C22.4981 12.7645 22.638 12.5016 22.638 12.1674C22.638 11.9337 22.5692 11.7387 22.4319 11.5782C22.2944 11.4175 22.0455 11.2739 21.6841 11.1453L20.4045 10.7192C19.849 10.5363 19.4324 10.2865 19.1542 9.9702C18.8761 9.6546 18.7371 9.2854 18.7371 8.8632C18.7371 8.5224 18.8159 8.2175 18.9749 7.9498C19.1333 7.6822 19.3462 7.4528 19.6115 7.2652C19.8768 7.078 20.1815 6.9339 20.5262 6.8347C20.871 6.7354 21.2333 6.6855 21.6124 6.6855C21.8118 6.6855 22.0171 6.6999 22.2264 6.7284C22.4358 6.7575 22.63 6.7966 22.8105 6.8459C22.9848 6.8959 23.1482 6.9523 23.3004 7.0164C23.4526 7.0802 23.5706 7.145 23.6526 7.2098C23.7726 7.2918 23.857 7.3765 23.9099 7.4689C23.9629 7.558 23.9897 7.6703 23.9897 7.8027V8.2625C23.9897 8.47 23.9056 8.576 23.7372 8.576C23.6532 8.576 23.5272 8.5376 23.3595 8.4595C22.7514 8.2119 22.1183 8.088 21.4594 8.088C21.004 8.088 20.6502 8.1678 20.4026 8.3274C20.1546 8.4871 20.0307 8.7256 20.0307 9.0469C20.0307 9.2806 20.1051 9.4815 20.255 9.6477C20.4045 9.8139 20.6818 9.9668 21.0889 10.1059L22.3298 10.5265C22.8765 10.7039 23.277 10.9429 23.5307 11.2438C23.7839 11.545 23.9105 11.8994 23.9105 12.3107C23.9105 12.6626 23.829 12.9824 23.6648 13.2649C23.5007 13.5478 23.2778 13.7889 23.0017 13.9857C22.7255 14.1828 22.4013 14.3358 22.0343 14.4433C21.6655 14.5517 21.4276 14.5558 21.1478 14.5558Z" fill="#252F3E" />
                              <path d="M20.3183 18.1174C17.7524 20.0533 13.9252 21.0829 10.6628 21.0829C6.0851 21.0829 2.0157 19.3788 -0.9729 16.6129C-1.2191 16.3866 -0.9448 16.0733 -0.6466 16.2513C2.5649 18.1457 6.4629 19.3133 10.5254 19.3133C13.2867 19.3133 16.3097 18.7212 19.1062 17.5101C19.5976 17.287 20.0142 17.7945 20.3183 18.1174Z" fill="#FF9900" />
                              <path d="M21.3578 16.9335C21.0045 16.4814 19.3982 16.8033 18.5583 16.9332C18.2914 16.9753 18.2536 16.7325 18.4952 16.544C19.6911 15.6867 21.6957 16.0789 21.9924 16.4407C22.289 16.803 21.916 18.9175 20.803 19.8827C20.578 20.0794 20.3538 19.9789 20.448 19.7356C20.7446 19.0135 21.7108 17.3851 21.3578 16.9335Z" fill="#FF9900" />
                            </svg>
                          )
                        },
                        {
                          name: 'GCP',
                          description: 'Monitor your Google Cloud Platform for compliance',
                          connected: false,
                          icon: (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.5909 14.2238V18.0456H18.4127L14.5909 14.2238Z" fill="#EA4335" />
                              <path d="M14.5909 9.776H9.40909V14.9578H14.5909V9.776Z" fill="#4285F4" />
                              <path d="M9.40909 14.9578H5.5873V18.7796H9.40909V14.9578Z" fill="#34A853" />
                              <path d="M5.5873 9.776L5.5873 14.9578L9.40909 14.9578L5.5873 9.776Z" fill="#FBBC05" />
                            </svg>
                          )
                        },
                      ].map((integration, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-premium-sm transition-all">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center mr-4">
                              {integration.icon}
                            </div>
                            <div>
                              <h3 className="font-medium">{integration.name}</h3>
                              <p className="text-sm text-gray-500">{integration.description}</p>
                            </div>
                          </div>
                          {integration.connected ? (
                            <Button variant="outline" size="sm">
                              Disconnect
                            </Button>
                          ) : (
                            <Button size="sm">
                              Connect
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Security & Privacy</CardTitle>
                    <CardDescription>Manage your security settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">Two-factor authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                          <input 
                            type="checkbox" 
                            id="twoFactor" 
                            className="sr-only"
                          />
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300"></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">Activity notifications</h3>
                          <p className="text-sm text-gray-500">Receive alerts for suspicious activity</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-primary">
                          <input 
                            type="checkbox" 
                            id="activityNotifs" 
                            className="sr-only"
                            defaultChecked
                          />
                          <span className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300"></span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">Data sharing</h3>
                          <p className="text-sm text-gray-500">Allow anonymous usage data collection</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-primary">
                          <input 
                            type="checkbox" 
                            id="dataSharing" 
                            className="sr-only"
                            defaultChecked
                          />
                          <span className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300"></span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Settings;
