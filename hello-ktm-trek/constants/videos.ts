export const TRIP_VIDEO_IDS: Record<string, string> = {
  'everest-base-camp-trek':   'FlX2e0FBUUE',
  'annapurna-base-camp-trek': 'x_fsKrFx9-M',
  'everest-helicopter-tour':  'KoTe9J82LAI',
  'bhutan-cultural-tour':     'SaCmcmB-6Xw',
  'upper-mustang-trek':       'ipuT7_wPF9Y',
  'langtang-valley-trek':     'iTKYXcso2Mo',
}

export const BLOG_VIDEO_IDS: Record<string, string> = {
  'best-time-everest-base-camp':          'FlX2e0FBUUE',
  'packing-list-himalayan-trekking':      'hjvwsHhFGg0',
  'altitude-sickness-prevention-treatment': 'ipuT7_wPF9Y',
  'bhutan-travel-guide-2024':             'SaCmcmB-6Xw',
}

export const DESTINATION_VIDEO_IDS: Record<string, string> = {
  'Nepal':  'hjvwsHhFGg0',
  'Bhutan': 'SaCmcmB-6Xw',
  'Tibet':  'PaX0vLT5J4U',
  'India':  '2NYwewKYHB4',
}

export function youtubeEmbedUrl(videoId: string) {
  return (
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
    `&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`
  )
}
