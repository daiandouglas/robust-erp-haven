
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// ERP-specific colors
				erp: {
					blue: {
						light: '#E5F3FF',
						DEFAULT: '#3498db',
						dark: '#2980b9',
					},
					gray: {
						lightest: '#F8FAFC',
						light: '#F1F5F9',
						DEFAULT: '#94A3B8',
						dark: '#475569',
						darkest: '#1E293B',
					},
					accent: {
						DEFAULT: '#7988ec',
						light: '#E8EBFF',
					},
					success: {
						light: '#E7F9F0',
						DEFAULT: '#13ce66',
						dark: '#10ac53',
					},
					warning: {
						light: '#FFF8E7',
						DEFAULT: '#ffcd56',
						dark: '#f5b400',
					},
					error: {
						light: '#FCEEED',
						DEFAULT: '#ff5252',
						dark: '#e03e3e',
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(100%)' }
				},
				'slide-in-left': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-out-left': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' }
				},
				'slide-in-bottom': {
					from: { transform: 'translateY(100%)' },
					to: { transform: 'translateY(0)' }
				},
				'slide-out-bottom': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(100%)' }
				},
				'slide-in-top': {
					from: { transform: 'translateY(-100%)' },
					to: { transform: 'translateY(0)' }
				},
				'slide-out-top': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(-100%)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-in-out',
				'fade-out': 'fade-out 0.3s ease-in-out',
				'slide-in-right': 'slide-in-right 0.3s ease-in-out',
				'slide-out-right': 'slide-out-right 0.3s ease-in-out',
				'slide-in-left': 'slide-in-left 0.3s ease-in-out',
				'slide-out-left': 'slide-out-left 0.3s ease-in-out',
				'slide-in-bottom': 'slide-in-bottom 0.3s ease-in-out',
				'slide-out-bottom': 'slide-out-bottom 0.3s ease-in-out',
				'slide-in-top': 'slide-in-top 0.3s ease-in-out',
				'slide-out-top': 'slide-out-top 0.3s ease-in-out',
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.08)',
				'glass-xl': '0 16px 64px rgba(0, 0, 0, 0.1)',
				'subtle': '0 2px 8px rgba(0, 0, 0, 0.05)',
				'elevated': '0 10px 20px rgba(0, 0, 0, 0.06)',
				'button': '0 1px 2px rgba(0, 0, 0, 0.05)',
				'button-hover': '0 4px 8px rgba(0, 0, 0, 0.08)',
			},
			backdropBlur: {
				'glass': 'blur(16px)',
				'glass-sm': 'blur(8px)',
				'glass-lg': 'blur(24px)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
