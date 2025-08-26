
<script setup lang="ts">
import { ref, onMounted } from 'vue'


// Animated statistics
const animatedStats = ref({
  properties: 0,
  clients: 0,
  cities: 0
})

const targetStats = {
  properties: 15000,
  clients: 8500,
  cities: 12
}

// Company values
const values = ref([
  {
    id: 1,
    icon: '🤝',
    title: 'Trust & Transparency',
    description: 'We believe in honest communication and transparent dealings. Every property listing is verified, and every transaction is handled with complete integrity.'
  },
  {
    id: 2,
    icon: '🏆',
    title: 'Ethiopian Excellence',
    description: 'We celebrate and promote the finest Ethiopian properties, showcasing the beauty and potential of spaces across our nation.'
  },
  {
    id: 3,
    icon: '💡',
    title: 'Innovation & Technology',
    description: 'Combining traditional Ethiopian hospitality with modern technology to create seamless property search and rental experiences.'
  },
  {
    id: 4,
    icon: '🌱',
    title: 'Community Growth',
    description: 'Every successful match contributes to the growth of Ethiopian communities, supporting local businesses and families.'
  },
  {
    id: 5,
    icon: '⚡',
    title: 'Quick & Efficient',
    description: 'We understand time is valuable. Our streamlined processes ensure you find and secure your perfect space quickly.'
  },
  {
    id: 6,
    icon: '💚',
    title: 'Customer-Centric',
    description: 'Your satisfaction is our success. We go above and beyond to ensure your property journey is smooth and enjoyable.'
  }
])

// Client testimonials
const testimonials = ref([
  {
    id: 1,
    name: 'Alemayehu Tadesse',
    role: 'Business Owner',
    location: 'Addis Ababa',
    text: 'Nerds rent helped me find the perfect office space for my growing tech company. The process was smooth, and the team was incredibly professional and knowledgeable about the local market.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Hanan Mohammed',
    role: 'Software Engineer',
    location: 'Bahir Dar',
    text: 'As a remote worker, I needed a house with reliable internet and a quiet environment. They found me exactly what I was looking for, and the rental process was hassle-free.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3d0?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Dawit Hailu',
    role: 'Restaurant Owner',
    location: 'Hawassa',
    text: 'Finding commercial space for my restaurant seemed impossible until I contacted Nerds rent. They understood my needs and budget, leading me to the perfect location.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Meron Bekele',
    role: 'Teacher',
    location: 'Gondar',
    text: 'Moving to a new city was stressful, but Nerds rent made finding a home easy. They showed me multiple options and helped me choose the best one for my family.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Getnet Worku',
    role: 'Consultant',
    location: 'Dire Dawa',
    text: 'The team at Nerds rent is amazing! They listened to my requirements and found me a beautiful house that exceeded my expectations. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Tigist Alemu',
    role: 'Entrepreneur',
    location: 'Mekelle',
    text: 'Professional, reliable, and efficient - everything you want in a property service. They helped me find both my home and office space with excellent customer service.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  }
])

// Animate statistics on mount
onMounted(() => {
  const duration = 2000
  const steps = 60
  const interval = duration / steps

  Object.keys(targetStats).forEach(key => {
    const target = targetStats[key as keyof typeof targetStats]
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        animatedStats.value[key as keyof typeof animatedStats.value] = target
        clearInterval(timer)
      } else {
        animatedStats.value[key as keyof typeof animatedStats.value] = Math.floor(current)
      }
    }, interval)
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-warm-cream to-secondary/30">
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 ethiopian-pattern"></div>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-6 py-3 rounded-full font-medium mb-6 border border-primary/20">
            <span class="text-lg">🏠</span>
            <span>About Nerds rent</span>
            <span class="text-lg">☕</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Connecting You to 
            <span class="bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">
              Perfect Spaces
            </span>
          </h1>
          
          <p class="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Born from a passion for Ethiopian excellence, Nerds rent transforms the way people find their ideal homes and offices across our beautiful country.
          </p>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full font-medium mb-6 border border-primary/20">
              <span>📖</span>
              <span>Our Story</span>
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built by Ethiopians, for Ethiopians
            </h2>
            
            <div class="space-y-4 text-muted-foreground">
              <p>
                Founded in the heart of Addis Ababa, Nerds rent emerged from a simple observation: finding quality housing and office spaces in Ethiopia shouldn't be complicated or time-consuming.
              </p>
              <p>
                Our team of passionate real estate professionals and technology enthusiasts came together to create a platform that truly understands the Ethiopian market, culture, and unique needs of our communities.
              </p>
              <p>
                Today, we proudly serve thousands of families and businesses across major Ethiopian cities, helping them discover spaces where dreams take root and businesses flourish.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-6 mt-8">
              <div class="text-center">
                <div class="text-2xl font-bold text-accent mb-1">{{ animatedStats.properties }}+</div>
                <div class="text-sm text-muted-foreground">Properties Listed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-accent mb-1">{{ animatedStats.clients }}+</div>
                <div class="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-accent mb-1">{{ animatedStats.cities }}</div>
                <div class="text-sm text-muted-foreground">Cities Covered</div>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop"
              alt="Modern Ethiopian office building"
              class="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-gradient-to-b from-secondary/30 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full font-medium mb-6 border border-primary/20">
            <span>⭐</span>
            <span>Our Values</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Drives Us Forward
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="value in values" :key="value.id" class="bg-white rounded-xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-r from-accent to-yellow-400 rounded-xl flex items-center justify-center mb-4">
              <span class="text-xl">{{ value.icon }}</span>
            </div>
            <h3 class="text-xl font-bold text-foreground mb-3">{{ value.title }}</h3>
            <p class="text-muted-foreground">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
      <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-primary to-deep-green">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Space?
          </h2>
          <p class="text-lg text-gray-200 mb-8">
            Join thousands of satisfied clients who found their ideal homes and offices through Nerds rent.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-gradient-to-r from-accent to-yellow-400 text-primary font-semibold px-8 py-4 rounded-xl hover:from-accent/90 hover:to-yellow-400/90 transition-all duration-300 shadow-lg">
              Browse Properties
            </button>
            <button class="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-4 py-2 rounded-full font-medium mb-6 border border-primary/20">
            <span>💬</span>
            <span>Testimonials</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people who found their perfect spaces through Nerds rent.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id"
            class="bg-gradient-to-br from-white to-secondary/20 rounded-xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300 relative"
          >
            <!-- Quote Icon -->
            <div class="absolute top-4 right-4 text-accent/30 text-2xl">"</div>
            
            <!-- Rating -->
            <div class="flex gap-1 mb-4">
              <span v-for="star in 5" :key="star" class="text-accent text-sm">⭐</span>
            </div>

            <!-- Testimonial Text -->
            <p class="text-muted-foreground mb-6 italic leading-relaxed">
              "{{ testimonial.text }}"
            </p>

            <!-- Author Info -->
            <div class="flex items-center gap-4">
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
              />
              <div>
                <div class="font-semibold text-foreground">{{ testimonial.name }}</div>
                <div class="text-sm text-muted-foreground">{{ testimonial.role }}</div>
                <div class="text-xs text-primary">{{ testimonial.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  

  </div>
</template>


<style scoped>
.warm-cream {
  background-color: #FDF8F0;
}

.deep-green {
  background-color: #3C6E47;
}

.ethiopian-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(212, 160, 23, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(60, 110, 71, 0.1) 2px, transparent 2px);
  background-size: 40px 40px;
}
</style>