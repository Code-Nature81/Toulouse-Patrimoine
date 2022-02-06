


class CitiesSlider extends React.Component {
  constructor(props) {
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 2900;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }) },
      React.createElement("p", { className: "slider__top-heading" }, "Toulouse 10 lieux à voir"),
      
      React.createElement("div", { className: "slider__slides" },
      this.props.slides.map((slide, index) =>
      React.createElement("div", {
        className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
        key: slide.city },

      React.createElement("div", { className: "slider__slide-content" },
      React.createElement("h3", { className: "slider__slide-subheading" }, slide.country || slide.city),
      React.createElement("h2", { className: "slider__slide-heading" },
      slide.city.split('').map(l => React.createElement("span", null, l))),

      React.createElement("p", { className: "slider__slide-readmore" }, "")),

      React.createElement("div", { className: "slider__slide-parts" },
      [...Array(this.IMAGE_PARTS).fill()].map((x, i) =>
      React.createElement("div", { className: "slider__slide-part", key: i },
      React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))),






      React.createElement("div", { className: "slider__control", onClick: () => this.changeSlides(-1) }),
      React.createElement("div", { className: "slider__control slider__control--right", onClick: () => this.changeSlides(1) })));


}}


const slides = [
{
  city: 'Capitole',
  country: 'Donjon',
  img: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Toulouse_donjon_du_Capitole.jpg' },
{
  city: 'Capitole',
  country: 'Place',
  img: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Toulouse_Capitole_Night_Wikimedia_Commons.jpg' },

{
  city: 'St-Sernin',
  country: 'Basilique',
  img: 'https://live.staticflickr.com/7132/8154166449_f9ea6d3510_b.jpg' },

{
  city: 'Jacobin',
  country: 'Couvent',
  img: 'https://live.staticflickr.com/65535/49454099336_6bf322c182_b.jpg' },

{
  city: 'Daurade',
  country: 'La',
  img: 'https://live.staticflickr.com/3722/9585987871_3f76c15b16_b.jpg' },

  {
    city: 'Pont-neuf',
    country: 'Garonne',
    img: 'https://live.staticflickr.com/4692/24671243847_e5677a6612_b.jpg' },
  
  {
    city: 'Gauche',
    country: 'Rive',
    img: 'https://live.staticflickr.com/2461/3765632364_fe8961be31_b.jpg' },
  
  {
    city: 'Assezat',
    country: 'Hotel',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/74/H%C3%B4tel_d%27Ass%C3%A9zat%2C_toulouse_%28single_shot%29.jpg' },
  
  {
    city: 'St-Etienne',
    country: 'Cathédrle',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Fa%C3%A7ade_de_la_cath%C3%A9drale_Saint-%C3%89tienne_de_Toulouse.jpg/590px-Fa%C3%A7ade_de_la_cath%C3%A9drale_Saint-%C3%89tienne_de_Toulouse.jpg' },
  
  {
    city: 'Augustins',
    country: 'Musée',
    img: 'https://www.codart.nl/wp-content/uploads/2016/11/Mus%C3%A9e-des-Augustins-Toulouse-scaled.jpg' }];



ReactDOM.render(React.createElement(CitiesSlider, { slides: slides }), document.querySelector('#app'));

