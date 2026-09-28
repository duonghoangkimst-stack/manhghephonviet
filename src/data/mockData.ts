import { Article, Product, Province, HeritageSite, QuizQuestion, UserProfile } from '../types';
import quangTri1972Img from '../assets/images/thanh-co-quang-tri-1972.jpg';
import chuaMotCotImg from '../assets/images/chua-mot-cot.jpg';
import saigonPalaceImg from '../assets/images/dinh-doc-lap.jpg';
import dienBienPhuImg from '../assets/images/dien_bien_phu_1788878901153.jpg';
import doiA1Img from '../assets/images/doi_a1_ho_boc_pha_1788880138184.jpg';
import hamDeCastriesImg from '../assets/images/ham_de_castries_1788879323132.jpg';
import soChiHuyImg from '../assets/images/so_chi_huy_1788879341577.jpg';
import cauMuongThanhImg from '../assets/images/cau_muong_thanh_1788879366410.jpg';
import doiHimLamImg from '../assets/images/doi_him_lam_1788879387996.jpg';
import hongCumImg from '../assets/images/hong_cum_1788879407856.jpg';
import { InteractionSection } from 'scr/components/InteractionSection';

export const INITIAL_USER: UserProfile = {
  name: 'Nguyễn Văn An',
  email: 'n********an@gmail.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKITfMA6JKkGvoSexHqJI5DA2olEI56FqlYXJaP7XxQX7fGjc7I8pf1bfRSiZocqZWOAPnOK2RcBK4RG_SgzisA70GDNJAV1ikI02FPnvzOMcI1mbs_GT3EWdzkpMzj9ctDIMYyUA6zCKNsQFZOlZ8qvTz5r_s5q4fHAeWE_-qANt2lWUhiqFLl3m432BVM_Yb0havSVLoU7__wulExPmt1Ysa-2y5JTG9p_wwVLQU89T_XdtqrHnM7Q',
  level: 5,
  title: 'Người Giữ Sử',
  xp: 2450,
  nextXp: 3000,
  completedGames: 5,
  discoveredStories: 18,
  achievementsCount: 12,
  starsCount: 500,
  lotusPoints: 120,
};

export const PROVINCES: Province[] = [
  // --- MIỀN BẮC (15 TỈNH THÀNH) ---
  {
    id: 'ha-noi',
    name: 'Thành phố Hà Nội',
    region: 'north',
    sitesCount: '6.489',
    storiesCount: 18,
    image: '/Hà Nội.jpg',
    desc: 'Thủ đô ngàn năm văn hiến với Hoàng thành Thăng Long, Văn Miếu và 36 phố phường cổ kính.'
  },
  {
    id: 'hai-phong',
    name: 'Thành phố Hải Phòng',
    region: 'north',
    sitesCount: '~ 4.000',
    storiesCount: 11,
    image: '/Hải Phòng.jpg',
    desc: 'Thành phố hoa phượng đỏ với Di tích Bến tàu Không số K15 và Quần đảo Cát Bà.'
  },
  {
    id: 'tuyen-quang',
    name: 'Tỉnh Tuyên Quang',
    region: 'north',
    sitesCount: '719',
    storiesCount: 8,
    image: '/Tuyên Quang.jpg',
    desc: 'Thủ đô Khu giải phóng, Thủ đô Kháng chiến với Di tích Tân Trào lịch sử.'
  },
  {
    id: 'lao-cai',
    name: 'Tỉnh Lào Cai',
    region: 'north',
    sitesCount: '150+',
    storiesCount: 6,
    image: '/Lào Cai.jpg',
    desc: 'Vùng đất biên cương hùng vĩ với đỉnh Fansipan, đền Bảo Hà và ruộng bậc thang Sa Pa kỳ vĩ.'
  },
  {
    id: 'lai-chau',
    name: 'Tỉnh Lai Châu',
    region: 'north',
    sitesCount: '120+',
    storiesCount: 5,
    image: '/Lai Châu.jpg',
    desc: 'Vùng non cao kỳ vĩ với đèo Ô Quy Hồ huyền thoại, bản Sin Suối Hồ và di tích Bia đá Vua Lê Lợi.'
  },
  {
    id: 'dien-bien',
    name: 'Tỉnh Điện Biên',
    region: 'north',
    sitesCount: '33',
    relicsCount: 33,
    explorationRate: 0,
    storiesCount: 12,
    image: '/Bìa điện biên.png',
    desc: 'Vùng đất lịch sử với chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu".'
  },
  {
    id: 'lang-son',
    name: 'Tỉnh Lạng Sơn',
    region: 'north',
    sitesCount: '581',
    storiesCount: 7,
    image: 'Lạng Sơn.jpg',
    desc: 'Ải Chi Lăng lẫy lừng chiến công chống giặc ngoại xâm cùng Động Nhị Thanh - Tam Thanh.'
  },
  {
    id: 'cao-bang',
    name: 'Tỉnh Cao Bằng',
    region: 'north',
    sitesCount: '271',
    storiesCount: 11,
    image: '/Cao Bằng.jpg',
    desc: 'Khu di tích Pác Bó nơi Bác Hồ về nước lãnh đạo cách mạng và Thác Bản Giốc hùng vĩ.'
  },
  {
    id: 'son-la',
    name: 'Tỉnh Sơn La',
    region: 'north',
    sitesCount: '200+',
    storiesCount: 7,
    image: '/Sơn La.jpg',
    desc: 'Mảnh đất Tây Bắc hào hùng với Di tích Nhà tù Sơn La cùng cây đào Tô Hiệu bất khuất.'
  },
  {
    id: 'thai-nguyen',
    name: 'Tỉnh Thái Nguyên',
    region: 'north',
    sitesCount: '800+',
    storiesCount: 8,
    image: 'Thái Nguyên.jpg',
    desc: 'Thủ đô gió ngàn ATK Định Hóa – trung tâm đầu não kháng chiến chống thực dân Pháp.'
  },
  {
    id: 'phu-tho',
    name: 'Tỉnh Phú Thọ',
    region: 'north',
    sitesCount: '2.778',
    storiesCount: 8,
    image: '/Phú Thọ.jpg',
    desc: 'Đất Tổ Hùng Vương – cội nguồn dân tộc với Tín ngưỡng thờ cúng Hùng Vương.'
  },
  {
    id: 'quang-ninh',
    name: 'Tỉnh Quảng Ninh',
    region: 'north',
    sitesCount: '636',
    storiesCount: 10,
    image: '/Quảng Ninh.jpg',
    desc: 'Kỳ quan thiên nhiên Vịnh Hạ Long và non thiêng Yên Tử – cái nôi Thiền phái Trúc Lâm.'
  },
  {
    id: 'bac-ninh',
    name: 'Tỉnh Bắc Ninh',
    region: 'north',
    sitesCount: '1.589',
    storiesCount: 12,
    image: 'Bắc Ninh.jpg',
    desc: 'Kinh Bắc hào hoa với Đền Đô thờ 8 vị vua triều Lý và Dân ca quan họ di sản văn hóa phi vật thể.'
  },
  {
    id: 'hung-yen',
    name: 'Tỉnh Hưng Yên',
    region: 'north',
    sitesCount: '1.800+',
    storiesCount: 9,
    image: 'Hưng Yên.jpg',
    desc: 'Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến với Quần thể di tích Phố Hiến và Đền Chử Đồng Tử.'
  },
  {
    id: 'ninh-binh',
    name: 'Tỉnh Ninh Bình',
    region: 'north',
    sitesCount: '5.000+',
    storiesCount: 9,
    image: '/Ninh Bình.jpg',
    desc: 'Cố đô Hoa Lư linh thiêng của nhà Đinh - Tiền Lê và Quần thể danh thắng Tràng An.'
  },

  // --- MIỀN TRUNG (11 TỈNH THÀNH) ---
  {
    id: 'thanh-hoa',
    name: 'Tỉnh Thanh Hóa',
    region: 'central',
    sitesCount: '1.535',
    storiesCount: 8,
    image: '/Thanh Hóa.jpg',
    desc: 'Vùng đất địa linh nhân kiệt với Di sản Thành nhà Hồ và Lam Kinh ngàn năm văn hiến.'
  },
  {
    id: 'nghe-an',
    name: 'Tỉnh Nghệ An',
    region: 'central',
    sitesCount: '2.600+',
    storiesCount: 11,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPTB9JML2s3NkD9wJWcJqjBQYcKCVrxYshL35qYI4ufD6LcsjeF7R4MhFCAtkXhPB4tNhEv9Re9NnIaducL59LSwqW67UF4-lkjQSUiJnTBsquqP-We9Wf-KyT8bz-8HwF7gqiyQru613prwDrufB1sySkvffPqZ1cEuYqRd1dqakt0Rq42AhGl45fpyZ0id4smunOTmebcMHExEYIbr31A5YJq7BNOySTQqEOWprHcdRVCYAwEbP_CMU1o64EZuVK6e4',
    desc: 'Quê hương của Chủ tịch Hồ Chí Minh vĩ đại và truyền thống Xô Viết Nghệ Tĩnh kiên trung.'
  },
  {
    id: 'ha-tinh',
    name: 'Tỉnh Hà Tĩnh',
    region: 'central',
    sitesCount: '1.800+',
    storiesCount: 7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKLIjEuG6tYX-_N0Hz00bWI7574X6cPbV_45fBKu-FuAMMQe37JNC5oOM7jvuqMNzWDbseFigjNCazDNCcMqm6SNBNgAkF7Kyj1-oZnpQ28-pfiak7hhNSJETBntKNGgahX0fRXuz1_GaPc80hxoB3HgSHx_SpE_rLqxCA5gkNSy4O9PcJko0-kTDHhVvNe6JdzKWojU8DXv05EBu5SRR_zBzg7zAmHfOEoRh7NtI6p_Yr2p_g6GYF4A',
    desc: 'Ngã ba Đồng Lộc linh thiêng với 10 cô gái thanh niên xung phong anh hùng.'
  },
  {
    id: 'quang-tri',
    name: 'Tỉnh Quảng Trị',
    region: 'central',
    sitesCount: '500+',
    storiesCount: 18,
    image: '/Quảng Trị.jpg',
    desc: 'Mảnh đất anh hùng với 81 ngày đêm Thành cổ, Đôi bờ Hiền Lương và Địa đạo Vịnh Mốc.'
  },
  {
    id: 'hue',
    name: 'Thành phố Huế',
    region: 'central',
    sitesCount: '1.000+',
    storiesCount: 16,
    image: '/Huế.jpg',
    desc: 'Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới.'
  },
  {
    id: 'da-nang',
    name: 'Thành phố Đà Nẵng',
    region: 'central',
    sitesCount: '100+',
    storiesCount: 8,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    desc: 'Thành phố đầu biển cuối sông với Di tích danh thắng Ngũ Hành Sơn và Thành Điện Hải kiên cường.'
  },
  {
    id: 'quang-ngai',
    name: 'Tỉnh Quảng Ngãi',
    region: 'central',
    sitesCount: '250+',
    storiesCount: 7,
    image: '/Quảng Ngãi.jpg',
    desc: 'Vương quốc tỏi đảo Lý Sơn, Di tích Ba Tơ khởi nghĩa và cái nôi Văn hóa Sa Huỳnh cổ xưa.'
  },
  {
    id: 'gia-lai',
    name: 'Tỉnh Gia Lai',
    region: 'central',
    sitesCount: '200+',
    storiesCount: 8,
    image: '/Gia Lai.jpg',
    desc: 'Hào khí Tây Nguyên với Quần thể di tích Tây Sơn Thượng Đạo và Chiến thắng Đắk Pơ lẫy lừng.'
  },
  {
    id: 'dak-lak',
    name: 'Tỉnh Đắk Lắk',
    region: 'central',
    sitesCount: '150+',
    storiesCount: 9,
    image: '/Đắk Lắk.jpg',
    desc: 'Thủ phủ cà phê đại ngàn với Di tích Nhà đày Buôn Ma Thuột và Không gian Văn hóa Cồng chiêng.'
  },
  {
    id: 'khanh-hoa',
    name: 'Tỉnh Khánh Hòa',
    region: 'central',
    sitesCount: '300+',
    storiesCount: 8,
    image: '/Khánh Hòa.jpg',
    desc: 'Xứ trầm biển yến với Tháp Bà Ponagar cổ kính và Di tích Tàu Không số C235 tại Vịnh Vân Phong.'
  },
  {
    id: 'lam-dong',
    name: 'Tỉnh Lâm Đồng',
    region: 'central',
    sitesCount: '120+',
    storiesCount: 7,
    image: '/Lâm Đồng.jpg',
    desc: 'Cao nguyên Lang Biang thơ mộng với Di tích lịch sử Nhà lao Thiếu nhi Đà Lạt và Ga Đà Lạt cổ kính.'
  },

  // --- MIỀN NAM (8 TỈNH THÀNH) ---
  {
    id: 'tp-hcm',
    name: 'Thành phố Hồ Chí Minh',
    region: 'south',
    sitesCount: '321',
    storiesCount: 16,
    image:'/TpHCM.jpg' ,
    desc: 'Gia Định xưa, Sài Gòn nay – 300 năm qua từng lớp thời gian: Nơi mỗi di sản kể một câu chuyện của thành phố.'
  },
  {
    id: 'can-tho',
    name: 'Thành phố Cần Thơ',
    region: 'south',
    sitesCount: '38',
    storiesCount: 9,
    image: '/Cần Thơ.jpg',
    desc: 'Thủ phủ miền Tây sông nước với Chợ nổi Cái Răng và Nhà cổ Bình Thủy trứ danh.'
  },
  {
    id: 'dong-nai',
    name: 'Tỉnh Đồng Nai',
    region: 'south',
    sitesCount: '65',
    storiesCount: 8,
    image: '/Đồng Nai.jpg',
    desc: 'Hào khí miền Đông gian lao mà anh dũng với Chiến khu Đ, Vườn quốc gia Cát Tiên và Văn miếu Trấn Biên.'
  },
  {
    id: 'tay-ninh',
    name: 'Tỉnh Tây Ninh',
    region: 'south',
    sitesCount: '96',
    storiesCount: 8,
    image: '/Tây Ninh.jpg',
    desc: 'Căn cứ Trung ương Cục Miền Nam anh hùng và Tòa Thánh Tây Ninh độc đáo.'
  },
  {
    id: 'dong-thap',
    name: 'Tỉnh Đồng Tháp',
    region: 'south',
    sitesCount: '100+',
    storiesCount: 7,
    image: '/Đồng Tháp.jpg',
    desc: 'Khu di tích Gò Tháp văn hóa Óc Eo và Khu lăng mộ cụ Phó bảng Nguyễn Sinh Sắc.'
  },
  {
    id: 'an-giang',
    name: 'Tỉnh An Giang',
    region: 'south',
    sitesCount: '100+',
    storiesCount: 10,
    image: '/An Giang.jpg',
    desc: 'Khu di tích Óc Eo – Ba Thê huyền bí và Rừng tràm Trà Sư bạt ngàn.'
  },
  {
    id: 'vinh-long',
    name: 'Tỉnh Vĩnh Long',
    region: 'south',
    sitesCount: '68',
    storiesCount: 7,
    image: '/Vĩnh Long.jpg',
    desc: 'Đất học phương Nam với Văn Thánh Miếu Vĩnh Long và Khu lưu niệm Giáo sư Viện sĩ Trần Đại Nghĩa.'
  },
  {
    id: 'ca-mau',
    name: 'Tỉnh Cà Mau',
    region: 'south',
    sitesCount: '50+',
    storiesCount: 6,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    desc: 'Cột mốc tọa độ Quốc gia Mũi Cà Mau – điểm cực Nam thiêng liêng của Tổ quốc.'
  }
];

export const HERITAGE_SITES: HeritageSite[] = [
  // Miền Bắc Sites
  {
    id: 'hoang-thanh-thang-long',
    name: 'Hoàng thành Thăng Long',
    provinceId: 'ha-noi',
    subtitle: 'Ngàn năm văn hiến',
    image: '/hoangthanhthanglong.jpg',
    desc: 'Trực tiếp bước vào không gian cung đình xưa, giải mã các hiện vật quý qua các triều Lý - Trần - Lê.',
    xpReward: 500
  },
  {
    id: 'van-mieu-quoc-tu-giam',
    name: 'Văn Miếu Quốc Tử Giám',
    provinceId: 'ha-noi',
    subtitle: 'Trường đại học đầu tiên',
    image: '/vanmieuquoctugiam.jpg',
    desc: 'Tìm hiểu truyền thống hiếu học, 82 bia tiến sĩ vinh danh hiền tài của đất nước.',
    xpReward: 400
  },
  {
    id: 'doi-a1-dien-bien',
    name: 'Đồi A1',
    provinceId: 'dien-bien',
    subtitle: 'Cứ điểm then chốt quả đồi Eliane 2',
    image: 'Đồi A1.jpg',
    desc: 'Điểm cao chiến lược quan trọng và là nơi diễn ra trận chiến ác liệt nhất, hiện còn lưu giữ hố bộc phá 960kg thuốc nổ.',
    xpReward: 550,
    experienceUrl: 'https://doia1-dienbienphu-manhghephonviet.netlify.app/'
  },
  {
    id: 'ham-de-castries-dien-bien',
    name: 'Hầm De Castries',
    provinceId: 'dien-bien',
    subtitle: 'Trung tâm đầu não tập đoàn cứ điểm',
    image: 'Hầm De Castries.jpg',
    desc: 'Sở chỉ huy của tướng De Castries kiên cố với vòm thép uốn cong, nơi lá cờ Quyết chiến Quyết thắng tung bay chiều 7/5/1954.',
    xpReward: 600
  },
  {
    id: 'so-chi-huy-muong-phang',
    name: 'Sở chỉ huy chiến dịch Điện Biên Phủ',
    provinceId: 'dien-bien',
    subtitle: 'Căn cứ Mường Phăng rừng đại ngàn',
    image: '/Sở chỉ huy chiến dịch Điện Biên Phủ.jpg',
    desc: 'Nơi Đại tướng Võ Nguyên Giáp và Bộ Chỉ huy đưa ra quyết định lịch sử chuyển sang phương châm "Đánh chắc, tiến chắc" vang dội.',
    xpReward: 580
  },
  {
    id: 'cau-muong-thanh-dien-bien',
    name: 'Cầu Mường Thanh',
    provinceId: 'dien-bien',
    subtitle: 'Cây cầu bắc qua dòng sông Nậm Rốm',
    image: 'Cầu Mường Thanh.jpg',
    desc: 'Cầu sắt dã chiến bắc qua sông Nậm Rốm, chứng kiến bước chân xung phong thần tốc của quân ta tiến thẳng vào bắt sống tướng De Castries.',
    xpReward: 500
  },
  {
    id: 'doi-him-lam-dien-bien',
    name: 'Đồi Him Lam',
    provinceId: 'dien-bien',
    subtitle: 'Cánh cửa thép mở màn chiến dịch',
    image: 'ĐỒI HIM LAM.jpg',
    desc: 'Trung tâm đề kháng Béatrice bị đập tan trong trận mở màn ngày 13/3/1954, nơi ngời sáng tấm gương anh hùng Phan Đình Giót lấy thân mình lấp lỗ châu mai.',
    xpReward: 520
  },
  {
    id: 'cu-diem-hong-cum-dien-bien',
    name: 'Cứ điểm Hồng Cúm',
    provinceId: 'dien-bien',
    subtitle: 'Phân khu Nam kiềm tỏa pháo binh',
    image: 'Cứ Điểm Hồng Cúm.jpg',
    desc: 'Cụm cứ điểm phân khu Nam bảo vệ sân bay dự bị và trận địa pháo binh của Pháp, bị quân ta siết chặt vòng vây và cô lập hoàn toàn.',
    xpReward: 510
  },
  {
    id: 'vinh-ha-long-site',
    name: 'Vịnh Hạ Long',
    provinceId: 'quang-ninh',
    subtitle: 'Kỳ quan thiên nhiên',
    image: 'vinhhalong.jpg',
    desc: 'Khám phá huyền tích Rồng Mẹ hạ phàm nhả ngọc tạo dựng thế trận bảo vệ non sông.',
    xpReward: 450
  },
  {
    id: 'co-do-hoa-lu-site',
    name: 'Cố đô Hoa Lư',
    provinceId: 'ninh-binh',
    subtitle: 'Kinh đô Đinh - Tiền Lê',
    image: 'co-do-hoa-lu.jpg',
    desc: 'Trải nghiệm hào khí dựng nước của Vua Đinh Tiên Hoàng sau khi dẹp loạn 12 sứ quân.',
    xpReward: 420
  },
  {
    id: 'den-hung-site',
    name: 'Khu Di tích Đền Hùng',
    provinceId: 'phu-tho',
    subtitle: 'Cội nguồn đất Mẹ',
    image: 'khuditichdenHung.jpg',
    desc: 'Hành hương về núi Nghĩa Lĩnh, dâng hương tri ân các Vua Hùng đã có công dựng nước.',
    xpReward: 480
  },
  {
    id: 'tan-trao-site',
    name: 'Khu Di tích Tân Trào',
    provinceId: 'tuyen-quang',
    subtitle: 'Thủ đô Kháng chiến',
    image: '/khuditichtantrao.jpg',
    desc: 'Nơi Bác Hồ và Trung ương Đảng lãnh đạo toàn dân làm nên cuộc Cách mạng Tháng Tám lịch sử.',
    xpReward: 460
  },
  {
    id: 'den-bao-ha-site',
    name: 'Đền Bảo Hà',
    provinceId: 'lao-cai',
    subtitle: 'Hào khí biên cương',
    image: '/denbaoha.jpg',
    desc: 'Nơi thờ danh tướng Hoàng Bảy có công giữ vững bờ cõi biên cương phía Bắc Tổ quốc.',
    xpReward: 430
  },
  {
    id: 'bia-le-loi-site',
    name: 'Di tích Bia đá Vua Lê Lợi',
    provinceId: 'lai-chau',
    subtitle: 'Bảo vật quốc gia non cao',
    image: '/biavuaLeLoi.jpg',
    desc: 'Bảo vật quốc gia khắc ghi bài thơ răn dạy tướng sĩ bảo vệ biên cương của Bình Định Vương Lê Lợi.',
    xpReward: 420
  },
  {
    id: 'ai-chi-lang-site',
    name: 'Khu Di tích Ải Chi Lăng',
    provinceId: 'lang-son',
    subtitle: 'Chiến công hiển hách',
    image: 'aichilang.jpg',
    desc: 'Nơi chôn vùi danh tướng Liễu Thăng, đập tan âm mưu xâm lược của nhà Minh năm 1427.',
    xpReward: 470
  },
  {
    id: 'pac-bo-site',
    name: 'Khu Di tích Pác Bó',
    provinceId: 'cao-bang',
    subtitle: 'Cội nguồn Cách mạng',
    image: 'pacbo.jpg',
    desc: 'Suối Lê Nin, núi Các Mác nơi Bác Hồ đặt chân về nước năm 1941 trực tiếp lãnh đạo cách mạng Việt Nam.',
    xpReward: 500
  },
  {
    id: 'nha-tu-son-la-site',
    name: 'Di tích Nhà tù Sơn La',
    provinceId: 'son-la',
    subtitle: 'Cây đào Tô Hiệu',
    image: 'nhatuSonLa.jpg',
    desc: 'Trường học cách mạng rèn luyện ý chí gang thép của các chiến sĩ cộng sản kiên trung nơi ngục tù đế quốc.',
    xpReward: 450
  },
  {
    id: 'atk-dinh-hoa-site',
    name: 'ATK Định Hóa',
    provinceId: 'thai-nguyen',
    subtitle: 'Thủ đô Gió ngàn',
    image: 'atkDinhHoa.jpg',
    desc: 'Trung tâm đầu não an toàn khu của Trung ương Đảng và Bác Hồ trong suốt 9 năm kháng chiến trường kỳ.',
    xpReward: 460
  },
  {
    id: 'den-do-site',
    name: 'Đền Đô - Cổ Pháp Điện',
    provinceId: 'bac-ninh',
    subtitle: 'Bát Vị Triều Lý',
    image: 'Đền Đô.jpg',
    desc: 'Nơi phụng thờ 8 vị vua triều Lý tại đất phát tích Cổ Pháp linh thiêng giàu truyền thống văn hiến.',
    xpReward: 440
  },
  {
    id: 'pho-hien-site',
    name: 'Quần thể Di tích Phố Hiến',
    provinceId: 'hung-yen',
    subtitle: 'Thương cảng hưng thịnh',
    image: 'Phố Hiến.jpeg',
    desc: 'Đệ nhị thương cảng sầm uất bậc nhất Đàng Ngoài thế kỷ 16–17 với Chùa Chuông, Đền Mẫu cổ kính.',
    xpReward: 450
  },
  {
    id: 'ben-tau-k15-site',
    name: 'Di tích Bến tàu K15 Đồ Sơn',
    provinceId: 'hai-phong',
    subtitle: 'Đường Hồ Chí Minh trên biển',
    image: '/bentauk15.jpg',
    desc: 'Điểm xuất phát của những đoàn tàu Không số cảm tử chi viện vũ khí cho chiến trường miền Nam anh hùng.',
    xpReward: 470
  },

  // Miền Trung Sites
  {
    id: 'thanh-co-quang-tri',
    name: 'Thành cổ Quảng Trị',
    provinceId: 'quang-tri',
    subtitle: '81 ngày đêm oanh liệt',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UXpYMAMJdN-FX6YOkK2UKblGu5hK9A0nAbJ8L01LQ8XHq2KLq5M9E-_Cd2xZIEdDsbaLlfwWeHm2Gqdj330xcDpCTslkgdvYXB47dnReJzN3p7nyJCo7KMIuQ5SONzIh1h7L28Ah6Z3I-EX7CELMTHsKj_jTtJouHcEAPWIw9-58YQEHg5T4fmP6MxNYJYFigu02cuwDVOV-RvateGbVbp4dFPQPUwgkQWVW5lY_ZWZZlOjnu2Ps4OUy1e',
    desc: 'Hóa thân thành người lính trẻ năm 1972 kiên cường giữ từng tấc đất di sản.',
    xpReward: 500
  },
  {
    id: 'doi-bo-hien-luong',
    name: 'Đôi bờ Hiền Lương',
    provinceId: 'quang-tri',
    subtitle: 'Chứng nhân chia cắt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKLIjEuG6tYX-_N0Hz00bWI7574X6cPbV_45fBKu-FuAMMQe37JNC5oOM7jvuqMNzWDbseFigjNCazDNCcMqm6SNBNgAkF7Kyj1-oZnpQ28-pfiak7hhNSJETBntKNGgahX0fRXuz1_GaPc80hxoB3HgSHx_SpE_rLqxCA5gkNSy4O9PcJko0-kTDHhVvNe6JdzKWojU8DXv05EBu5SRR_zBzg7zAmHfOEoRh7NtI6p_Yr2p_g6GYF4A',
    desc: 'Cầu Hiền Lương và sông Bến Hải – biểu tượng khát vọng thống nhất non sông.',
    xpReward: 350
  },
  {
    id: 'dia-dao-vinh-moc',
    name: 'Địa đạo Vịnh Mốc',
    provinceId: 'quang-tri',
    subtitle: 'Kỳ tích trong lòng đất',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfaga2d-3qG20LXvVN5B97hTLjDCQYkQrM1q5203DdIHHzjyKdTbHGzkLR78xPrzCwYVO2zI0Tw7p-47ZX_8r-rPn3dfI7hrLtUXV7wFHCjJx2_p_tm94NlEVSuAhnPe5seHUZtx1Ebxyfj7MG8KLvmBhOE5g84LxjJxB7QDZfwa5kDbYGatwbzWxCVG8XO7tDaMlvzHyC2jLeWbMwXPUhciuyJVpkhU5IJkEP8J6sGBd8_J2NQ1c5cQ',
    desc: 'Làng hầm sâu dưới lòng đất, minh chứng cho ý chí bất khuất của nhân dân ta.',
    xpReward: 400
  },
  {
    id: 'kinh-thanh-hue-site',
    name: 'Đại Nội Huế',
    provinceId: 'hue',
    subtitle: 'Dấu ấn Hoàng triều Nguyễn',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    desc: 'Chiêm ngưỡng kiến trúc cung đình Ngọ Môn, Điện Thái Hòa và Nhã nhạc Cung đình Huế.',
    xpReward: 480
  },
  {
    id: 'thanh-nha-ho-site',
    name: 'Thành Nhà Hồ',
    provinceId: 'thanh-hoa',
    subtitle: 'Kỳ quan kiến trúc đá',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXiSpYwkeQGIdSyrTvmtUEKAbZU-0QQXXoB1mBtUkm7E94OQ-QTi6vDUwYEIseRFAypGou-4MSny8TC6lPMupkT0UK3TYovk_M75TPjYpBKDv8i1W2XcMmS2AmFACNi-HYsKqmaoMLernDLT1wYw3t9K63xik5HRpyJ7FhX41cKqIukHVmVEC1GBG5HcdAKXnCtllqbh_gCDEcX0JPAwNmvR1296pFlbY9Tuv4gm1yKsxPgX7pAucP4nP_26vQV98yhlM',
    desc: 'Kỳ tích xây dựng thành quách bằng những khối đá xanh nghìn tấn thời nhà Hồ.',
    xpReward: 420
  },
  {
    id: 'nga-ba-dong-loc-site',
    name: 'Ngã ba Đồng Lộc',
    provinceId: 'ha-tinh',
    subtitle: '10 đóa hoa bất tử',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKLIjEuG6tYX-_N0Hz00bWI7574X6cPbV_45fBKu-FuAMMQe37JNC5oOM7jvuqMNzWDbseFigjNCazDNCcMqm6SNBNgAkF7Kyj1-oZnpQ28-pfiak7hhNSJETBntKNGgahX0fRXuz1_GaPc80hxoB3HgSHx_SpE_rLqxCA5gkNSy4O9PcJko0-kTDHhVvNe6JdzKWojU8DXv05EBu5SRR_zBzg7zAmHfOEoRh7NtI6p_Yr2p_g6GYF4A',
    desc: 'Khúc tráng ca bất diệt của 10 nữ liệt sĩ thanh niên xung phong giữ huyết mạch thông đường.',
    xpReward: 460
  },
  {
    id: 'kim-lien-site',
    name: 'Khu Di tích Kim Liên - Nam Đàn',
    provinceId: 'nghe-an',
    subtitle: 'Quê hương Chủ tịch Hồ Chí Minh',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPTB9JML2s3NkD9wJWcJqjBQYcKCVrxYshL35qYI4ufD6LcsjeF7R4MhFCAtkXhPB4tNhEv9Re9NnIaducL59LSwqW67UF4-lkjQSUiJnTBsquqP-We9Wf-KyT8bz-8HwF7gqiyQru613prwDrufB1sySkvffPqZ1cEuYqRd1dqakt0Rq42AhGl45fpyZ0id4smunOTmebcMHExEYIbr31A5YJq7BNOySTQqEOWprHcdRVCYAwEbP_CMU1o64EZuVK6e4',
    desc: 'Nơi lưu giữ những kỷ niệm tuổi thơ của Bác Hồ cùng gia đình tại làng Sen và làng Hoàng Trù.',
    xpReward: 490
  },
  {
    id: 'ngu-hanh-son-site',
    name: 'Danh thắng Ngũ Hành Sơn & Thành Điện Hải',
    provinceId: 'da-nang',
    subtitle: 'Di tích quốc gia đặc biệt',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    desc: 'Quần thể 5 ngọn núi đá vôi kỳ vĩ và Thành Điện Hải ghi dấu chiến công đánh Pháp năm 1858.',
    xpReward: 430
  },
  {
    id: 'ba-to-ly-son-site',
    name: 'Khu Di tích Ba Tơ & Đội Hoàng Sa Lý Sơn',
    provinceId: 'quang-ngai',
    subtitle: 'Hào khí đội hùng binh',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    desc: 'Nơi lưu giữ bằng chứng chủ quyền Hoàng Sa, Trường Sa và ngọn cờ khởi nghĩa Ba Tơ bất khuất.',
    xpReward: 450
  },
  {
    id: 'tay-son-thuong-dao-site',
    name: 'Di tích Tây Sơn Thượng Đạo',
    provinceId: 'gia-lai',
    subtitle: 'Căn cứ địa nghĩa quân Tây Sơn',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    desc: 'Căn cứ ban đầu nơi ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ tụ nghĩa dấy binh.',
    xpReward: 440
  },
  {
    id: 'nha-day-bmt-site',
    name: 'Di tích Nhà đày Buôn Ma Thuột',
    provinceId: 'dak-lak',
    subtitle: 'Bản lĩnh cộng sản Tây Nguyên',
    image: 'https://images.unsplash.com/photo-1509030450996-932d20501eb3?auto=format&fit=crop&w=800&q=80',
    desc: 'Nơi giam cầm và tôi luyện ý chí kiên trung của các nhà cách mạng tiêu biểu như Phan Đăng Lưu, Hồ Tùng Mậu.',
    xpReward: 460
  },
  {
    id: 'thap-ba-ponagar-site',
    name: 'Tháp Bà Ponagar & Bến K20',
    provinceId: 'khanh-hoa',
    subtitle: 'Di sản Chăm Pa & Tàu Không số',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    desc: 'Kiến trúc đền tháp Chăm Pa tuyệt mỹ và di tích Tàu Không số anh hùng tại Vịnh Vân Phong.',
    xpReward: 470
  },
  {
    id: 'nha-lao-thieu-nhi-site',
    name: 'Di tích Nhà lao Thiếu nhi Đà Lạt',
    provinceId: 'lam-dong',
    subtitle: 'Tuổi trẻ anh dũng kiên cường',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    desc: 'Nơi minh chứng tinh thần yêu nước quật cường bất khuất của các chiến sĩ nhỏ tuổi thời kháng chiến.',
    xpReward: 440
  },

  // Miền Nam Sites
  {
    id: 'dinh-doc-lap-site',
    name: 'Dinh Độc Lập',
    provinceId: 'tp-hcm',
    subtitle: 'Khoảnh khắc Toàn thắng 1975',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    desc: 'Khoảnh khắc trưa ngày 30/4/1975 xe tăng húc đổ cánh cổng Dinh Độc Lập, non sông thu về một mối.',
    xpReward: 520
  },
  {
    id: 'dia-dao-cu-chi-site',
    name: 'Địa đạo Củ Chi',
    provinceId: 'tp-hcm',
    subtitle: 'Đất thép thành đồng',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    desc: 'Hệ thống mê cung đường hầm bí mật dài hơn 250km xuyên lòng đất Củ Chi anh hùng.',
    xpReward: 480
  },
  {
    id: 'ben-nha-rong-site',
    name: 'Bến Nhà Rồng',
    provinceId: 'tp-hcm',
    subtitle: 'Nơi Bác ra đi tìm đường cứu nước',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    desc: 'Năm 1911, người thanh niên Nguyễn Tất Thành bước lên con tàu Amiral Latouche-Tréville ra đi tìm đường cứu nước.',
    xpReward: 450
  },
  {
    id: 'trung-uong-cuc-site',
    name: 'Trung ương Cục Miền Nam',
    provinceId: 'tay-ninh',
    subtitle: 'Thủ đô kháng chiến phương Nam',
    image: 'https://images.unsplash.com/photo-1628172901377-09415494d4d1?auto=format&fit=crop&w=800&q=80',
    desc: 'Bộ não chỉ huy kháng chiến miền Nam trong những năm tháng chống Mỹ cứu nước ác liệt.',
    xpReward: 440
  },
  {
    id: 'cho-noi-cai-rang-site',
    name: 'Chợ nổi Cái Răng',
    provinceId: 'can-tho',
    subtitle: 'Nét đẹp văn hóa sông nước',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    desc: 'Văn hóa buôn bán độc đáo "cây bẹo" trên sông Tiền, nét sống đậm tình người Tây Đô.',
    xpReward: 380
  },
  {
    id: 'van-mieu-tran-bien-site',
    name: 'Văn miếu Trấn Biên',
    provinceId: 'dong-nai',
    subtitle: 'Văn miếu đầu tiên xứ Đàng Trong',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    desc: 'Biểu trưng của truyền thống hiếu học, hào khí Đồng Nai và văn hiến phương Nam hơn 300 năm lịch sử.',
    xpReward: 420
  },
  {
    id: 'di-tich-go-thap-site',
    name: 'Khu Di tích Gò Tháp',
    provinceId: 'dong-thap',
    subtitle: 'Cái nôi Văn hóa Óc Eo cổ xưa',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    desc: 'Quần thể di tích quốc gia đặc biệt với các phế tích tôn giáo, kiến trúc và mộ táng Phù Nam cổ đại.',
    xpReward: 430
  },
  {
    id: 'di-tich-oc-eo-ba-the-site',
    name: 'Khu Di tích Óc Eo – Ba Thê',
    provinceId: 'an-giang',
    subtitle: 'Thương cảng Phù Nam huyền thoại',
    image: 'https://images.unsplash.com/photo-1606820262744-8451f280c44c?auto=format&fit=crop&w=800&q=80',
    desc: 'Di tích quốc gia đặc biệt chứa đựng dấu ấn đô thị cổ phồn hoa bậc nhất Đông Nam Á thời cổ đại.',
    xpReward: 450
  },
  {
    id: 'van-thanh-mieu-vinh-long-site',
    name: 'Văn Thánh Miếu Vĩnh Long',
    provinceId: 'vinh-long',
    subtitle: 'Đất học đất văn phương Nam',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    desc: 'Một trong ba Văn Thánh Miếu được xây dựng sớm nhất tại Nam Kỳ lục tỉnh, nơi tôn vinh Nho học và tiền hiền.',
    xpReward: 410
  },
  {
    id: 'cot-co-mui-ca-mau',
    name: 'Cột cờ Mũi Cà Mau',
    provinceId: 'ca-mau',
    subtitle: 'Điểm cực Nam thiêng liêng',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    desc: 'Đứng nơi cuối trời Tổ quốc, hướng về biển đảo quê hương với lòng tự hào dân tộc.',
    xpReward: 430
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Trận chiến bảo vệ Thành cổ Quảng Trị mùa hè năm 1972 kéo dài bao nhiêu ngày đêm?',
    options: ['56 ngày đêm', '81 ngày đêm', '100 ngày đêm', '12 ngày đêm'],
    correctIndex: 1,
    explanation: 'Cuộc chiến đấu anh dũng bảo vệ Thành cổ Quảng Trị diễn ra trong 81 ngày đêm rực lửa (từ 28/6/1972 đến 16/9/1972).'
  },
  {
    id: 2,
    question: 'Con sông nào gắn liền với ký ức linh thiêng tiếp tế và tưởng niệm các chiến sĩ Thành cổ Quảng Trị?',
    options: ['Sông Hương', 'Sông Thạch Hãn', 'Sông Gianh', 'Sông Bến Hải'],
    correctIndex: 1,
    explanation: 'Sông Thạch Hãn là dòng sông chứng nhân lịch sử, nơi hàng ngàn người lính trẻ đã vượt qua làn bom đạn để tiếp viện cho Thành cổ.'
  },
  {
    id: 3,
    question: 'Lượng bom đạn mà quân địch đã ném xuống Thành cổ Quảng Trị trong 81 ngày đêm tương đương với sức công phá của bao nhiêu quả bom nguyên tử?',
    options: ['1 quả bom nguyên tử', '3 quả bom nguyên tử', '7 quả bom nguyên tử', '10 quả bom nguyên tử'],
    correctIndex: 2,
    explanation: 'Với hơn 328.000 tấn bom đạn dội xuống mảnh đất vỏn vẹn 3km², sức công phá ước tính tương đương 7 quả bom nguyên tử ném xuống Hiroshima.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'sp-01',
    name: 'Mảnh ghép bản đồ Việt Nam NFC',
    category: 'chinh',
    price: 199000,
    oldPrice: 221000,
    rating: 4.9,
    soldCount: 1420,
    image: '/MANHGHEPNFC.jpg',
    shortDesc: 'Mảnh ghép 34 tỉnh thành của bản đồ Việt Nam tích hợp chip NFC thông minh.',
    description: 'Mảnh ghép 34 tỉnh thành của bản đồ Việt Nam tích hợp chip NFC thông minh. Chạm smartphone để truy cập vào giao diện trò chơi trên trang web và nhận mã giới thiệu đổi sao/sen.',
    nfcFeatures: [
      'Chạm để truy cập trực tiếp trải nghiệm trên web',
      'Cung cấp mã kích hoạt / mã giới thiệu riêng biệt',
      'Nhận quà tặng sao/sen khi nhập mã'
    ],
    inStock: true
  },
  {
    id: 'sp-02',
    name: 'Móc khóa di sản',
    category: 'phu',
    price: 49000,
    oldPrice: 54000,
    rating: 4.8,
    soldCount: 3820,
    image: '/MocKhoa.jpg',
    shortDesc: 'Móc khóa gỗ khắc họa các di tích lịch sử',
    description: 'Móc khóa làm bằng gỗ, khắc họa các di tích lịch sử nổi tiếng.',
    nfcFeatures: [
      'Có mã giới thiệu riêng',
      'Quà tặng Sao/ Sen đi kèm',
      'Truy cập trực tiếp trải nghiệm trên web'
    ],
    inStock: true
  },
  {
    id: 'sp-03',
    name: 'Nam châm di tích',
    category: 'phu',
    price: 69000,
    oldPrice: 77000,
    rating: 4.7,
    soldCount: 2150,
    image: '/Magnet.jpg',
    shortDesc: 'Nam châm dán hít trang trí tủ lạnh – Magnet Polyresin.',
    description: `Nam châm dán hít trang trí tủ lạnh – Magnet Tủ Lạnh Polyresin

Nam châm gắn tủ lạnh có nhiều thiết kế đa dạng, độc đáo về nhiều phong cách Việt Nam, con người và văn hóa các dân tộc từ dân gian đến hiện đại.
Sản phẩm có độ bền cao, sắc nét, bền màu theo thời gian thích hợp sử dụng làm quà tặng cho khách nước ngoài hoặc trang trí nhà cửa.

THÔNG TIN SẢN PHẨM:
• Hình dạng: Hình tròn/hình chữ nhật
• Kích thước: 7 - 10cm
• Chất liệu: Polyresin đảm bảo độ bền và độ sắc nét trong thiết kế.`,
    nfcFeatures: [
      'Có mã giới thiệu riêng',
      'Quà tặng Sao/ Sen đi kèm',
      'Truy cập trực tiếp trải nghiệm trên web'
    ],
    inStock: true
  },
  {
    id: 'sp-04',
    name: 'Bộ sưu tập quà lưu niệm',
    category: 'phu',
    price: 30000,
    oldPrice: 33000,
    rating: 5.0,
    soldCount: 940,
    image: '/BOSUUTAP.jpg',
    shortDesc: 'Món quà ý nghĩa dành tặng người thân và bạn bè quốc tế.',
    description: 'Hộp quà sang trọng bọc nhung bao gồm sổ tay giấy điệp thủ công, bút khắc gỗ Hồn Việt, bookmark kim loại hình hoa sen nghệ thuật.',
    nfcFeatures: ['Hộp quà bọc nhung sang trọng', 'Bộ quà tặng văn hóa thủ công'],
    inStock: true
  }
];

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  views: string;
  image: string;
  description: string;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'trai-nghiem-lich-su',
    slug: 'trai-nghiem-lich-su',
    title: 'Trải Nghiệm Lịch sử Việt Nam: Chạm vào hồn thiêng non nước',
    category: 'Về Mảnh ghép Hồn Việt',
    date: '26/09/2026',
    author: 'Mảnh Ghép Hồn Việt',
    image: '/BiaSEO1.jpg',
    description: 'Trải nghiệm lịch sử Việt Nam cùng Mảnh Ghép Hồn Việt qua bản đồ gỗ NFC và công nghệ tương tác số. Chạm nhẹ vào từng cột mốc để sống lại thời khắc hào hùng!',
    content: `
Học sử nước mình xưa nay dễ làm người đọc mỏi mệt vì những dòng niên đại khô khan nằm yên trên trang giấy. Việc **trải nghiệm lịch sử** mở ra lối tiếp cận hoàn toàn mới, người học từ vị thế bị động, đứng ngoài quan sát thành người chủ động bước vào lòng thời cuộc.

Tại *Mảnh Ghép Hồn Việt*, từng mốc son mở cõi được đánh thức sống động qua bản đồ gỗ thủ công tích hợp chip NFC cùng nền tảng số hóa. Chỉ cần một chạm nhẹ, bạn hữu đã có thể kết nối ngay với ký ức ngàn năm của cha ông.


## 1. Trải nghiệm lịch sử: Khi quá khứ không chỉ nằm trên trang sách

### 1.1. Trải nghiệm lịch sử là gì?
**Trải nghiệm lịch sử** là phương pháp tiếp cận quá khứ thông qua thị giác, thính giác và tương tác hai chiều thay vì chỉ đọc văn bản truyền thống. Người dùng chủ động khám phá từng vùng đất theo sở thích, nhu cầu của cá nhân.
- **Nhập vai tương tác:** Trải nghiệm lịch sử tương tác đưa người học vào thế trận của tiền nhân, thấu hiểu áp lực và mưu lược của từng quyết sách sinh tử.
- **Khám phá phi tuyến tính:** Bắt đầu từ một địa danh, một cột mốc, hệ thống mở ra mối liên kết chặt chẽ giữa địa hình và thế trận quân sự.
- **Chuẩn xác về sử liệu:** Dù đổi mới hình thức thể hiện, mọi dữ liệu đều bám sát các bộ chính sử uy tín để giữ trọn vẹn tính chân thực.

![Các bạn học sinh đang khám phá sách lịch sử tương tác](/images/hoc-sinh-kham-pha.jpg)

*Hình 1: Các bạn học sinh đang khám phá sách lịch sử tương tác*

### 1.2. Từ đọc lịch sử đến hành trình khám phá di sản
Thay vì đọc sách một chiều, **trải nghiệm lịch sử Việt Nam** tương tác số mang đến trải nghiệm khám phá trực quan, linh hoạt:

- **Chủ động điểm chạm:** Bắt đầu từ vùng đất, cột mốc hoặc sự kiện bạn quan tâm nhất.
- **Gắn kết bối cảnh:** Hiểu rõ mối liên hệ giữa địa hình và thời cuộc.
- **Đánh thức di sản:** Đưa tư liệu từ bảo tàng vào đời thực một cách sống động, đầy chân thật.

![Ứng dụng công nghệ AR mở ra trải nghiệm lịch sử trực quan, giúp người dùng khám phá những thời khắc hào hùng của dân tộc](/images/cong-nghe-ar-trong-giao-duc-lich-su.jpg)
*Hình 2: Ứng dụng công nghệ AR mở ra trải nghiệm lịch sử trực quan, giúp người dùng khám phá những thời khắc hào hùng của dân tộc*


## 2. Công nghệ số: Cầu nối đưa dòng chảy lịch sử về hiện tại
Ứng dụng số hóa biến nguồn tri thức lưu trữ trong viện bảo tàng thành nguồn tư liệu trực quan, sinh động:

- **Bản đồ tương tác:** Giúp người xem liên kết không gian địa lý với dòng thời gian, quan sát rõ đường tiến thoái quân lương và thế trận chiến lược qua từng thời kỳ.
- **Đa phương tiện chân thực:** Thuyết minh chuyên sâu hòa cùng âm thanh sóng cuộn, hiệu lệnh quân reo, tái hiện sinh động khí thế của thời đại.
- **Bảo tồn bền vững:** Trải nghiệm lịch sử qua công nghệ góp phần số hóa cổ vật, di tích và văn bản cổ, giúp thế hệ trẻ tiếp cận di sản nguồn cội dễ dàng hơn bao giờ hết.

![Bản đồ tương tác giúp trải nghiệm lịch sử theo cách mới](/images/giao-dien-ban-do-tuong-tac-kham-pha-lich-su.jpg)
*Hình 3: Bản đồ tương tác giúp trải nghiệm lịch sử theo cách mới*


## 3. Công nghệ NFC: Chạm vật phẩm vật lý, mở kho tàng số hóa
Dù công nghệ số rất trực quan, việc chỉ nhìn qua màn hình điện thoại vẫn thiếu đi cảm giác xúc giác chân thật. Công nghệ kết nối tầm ngắn NFC trên vật phẩm gỗ chính là chìa khóa xóa nhòa ranh giới giữa thực và ảo.

### 3.1. Từ mảnh ghép hữu hình đến hành trình tìm về nguồn cội
Nhờ vi mạch NFC tích hợp khéo léo bên trong, từng mảnh ghép thủ công không còn là món đồ trang trí đơn thuần. Mỗi mảnh ghép trở thành một "chìa khóa số" mở ra câu chuyện lịch sử của từng vùng đất.

| Tính năng tương tác | Cách thức hoạt động thực tế | Giá trị tri thức và cảm xúc mang lại |
| :--- | :--- | :--- |
| **Tra cứu tức thì** | Chạm nhẹ điện thoại lên vật phẩm để hiển thị mốc sử | Nắm bắt thông tin nhanh chóng, loại bỏ thao tác tìm kiếm rườm rà |
| **Tương tác đa chiều** | Lắng nghe giọng đọc thuyết minh, đối chiếu hình ảnh | Tăng khả năng ghi nhớ kiến thức, tạo sự rung cảm sâu sắc |
| **Sưu tầm trọn bộ** | Lắp ghép các mảnh vật lý đại diện cho các tỉnh thành | Cầm nắm được sản phẩm di sản, gắn kết không gian gia đình |

### 3.2. Bản đồ gỗ NFC: Đưa biểu tượng non sông vào không gian sống
Bản đồ gỗ tích hợp chip NFC là sự kết hợp chỉn chu giữa tay nghề thủ công mỹ nghệ và công nghệ tương tác hiện đại:

- **Mỗi tỉnh thành là một điểm chạm:** Từng mảnh gỗ đại diện cho một vùng đất địa linh nhân kiệt, mang theo câu chuyện dựng nước và giữ gìn bờ cõi đầy oai hùng.  
- **Nâng tầm thẩm mỹ không gian:** Bước ra khỏi công năng trang trí tường đơn thuần, trở thành một không gian trưng bày tri thức trang nhã, gợi mở câu chuyện văn hóa mỗi khi gia đình quây quần hay đón tiếp khách quý.

![Sản phẩm thủ công kết hợp NFC của Mảnh ghép Hồn Việt](/images/san-pham-ket-hop-nfc.jpg)
*Hình 4: Sản phẩm thủ công kết hợp NFC của Mảnh ghép Hồn Việt*

Bạn muốn trực tiếp chạm tay vào ngàn năm lịch sử hào hùng? Khám phá ngay tại Website [Mảnh ghép Hồn Việt](https://www.manhghephonviet.com).


## 4. Mảnh Ghép Hồn Việt: Tiếp nối dòng chảy di sản
Sự kết hợp giữa nghệ thuật mộc thủ công và chip NFC của Mảnh Ghép Hồn Việt biến lịch sử trở nên gần gũi, mạch lạc:
- **Mỗi mảnh ghép – Một câu chuyện:** Tái hiện chân thực từng bước mở cõi, giữ nước của dân tộc.
- **Mỗi điểm chạm – Một niềm tự hào:** Khơi dậy tinh thần yêu nước, kết nối giá trị truyền thống với thế hệ tương lai.


## Câu hỏi thường gặp (FAQ)

**1. Chip NFC trên bản đồ gỗ có cần sạc pin không?**  
*Không.* Chip NFC là vi mạch thụ động, lấy năng lượng từ cảm ứng từ trường của điện thoại khi chạm vào nên không cần pin hay dây sạc.

**2. Dòng điện thoại nào tương tác được với bản đồ?**  
Hầu hết smartphone hiện đại chạy iOS hoặc Android có tích hợp NFC đều quét và hiển thị thông tin ngay tức thì mà không cần cài app trung gian.

**3. Dữ liệu lịch sử được thẩm định từ nguồn nào?**  
Nội dung được nghiên cứu và đối chiếu chặt chẽ từ các bộ chính sử uy tín như *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục* cùng các công trình khoa học chuyên ngành.

**4. Gỗ của bản đồ có bị cong vênh hay mối mọt không?**  
Phôi gỗ tự nhiên được xử lý sấy chống ẩm và mối mọt theo quy chuẩn, đảm bảo độ bền cao và thích nghi tốt với khí hậu nóng ẩm tại Việt Nam. `
  },
{
    id: 'lay-goc-mon-lich-su',
    title: 'Bí quyết lấy gốc môn lịch sử dành cho người "ngại học"',
    excerpt: 'Mất gốc môn Lịch sử nên bắt đầu từ đâu? Cùng Mảnh ghép Hồn Việt khám phá lộ trình học ít, hiểu sâu, ẵm trọn điểm khá giỏi!',
    category: 'Góc học tập',
    date: '27/09/2026',
    author: 'Mảnh ghép Hồn Việt',
    image: '/bia_seo_2.jpg',
    content: `Cứ mở sách Lịch sử ra là bạn lại thấy hoa mắt trước hàng trăm con số và các cột mốc sự kiện dày đặc? Thực tế, việc lấy gốc môn lịch sử không hề đòi hỏi bạn phải thức trắng đêm nhồi nhét hay học vẹt từng trang sách. Bạn hoàn toàn có thể ghi nhớ tự nhiên, hiểu sâu tiến trình và bứt phá điểm số nếu nắm bắt phương pháp học trực quan, khoa học. Hãy đồng hành cùng Mảnh ghép Hồn Việt để việc học Sử trở nên nhẹ nhàng và tự tin đạt điểm số mơ ước ngay hôm nay!

### 1. Vì sao bạn học mãi vẫn mất gốc môn Lịch sử?
- **Thói quen học vẹt, nhồi nhét số liệu:** Cố nhớ từng ngày tháng lẻ tẻ mà không hiểu bản chất khiến não bộ nhanh chóng đào thải dữ liệu sau kỳ kiểm tra hoặc gặp tình trạng học trước quên sau.
- **Thiếu bức tranh toàn cảnh:** Học các sự kiện một cách rời rạc trên trang sách chữ dày đặc dễ gây buồn ngủ, khó xâu chuỗi tiến trình,, từ đó hình thành tâm lý “sợ” học.

![Áp lực ôn tập môn lịch sử theo cách truyền thống khiến học sinh nhanh nản lòng và kiệt sức](/images/hinh-anh-hoc-sinh-ap-luc-on-bai.jpg)
*Hình 1: Áp lực ôn tập môn lịch sử theo cách truyền thống khiến học sinh nhanh nản lòng và kiệt sức*

### 2. Lộ trình 3 bước lấy gốc môn Lịch sử hiệu quả không cần học thuộc
Thay vì học thuộc lòng, hãy áp dụng quy trình 3 bước tư duy trực quan:
- **Bước 1: Chia nhỏ giai đoạn bằng trục thời gian (Timeline):** Gom toàn bộ lịch sử Việt Nam thành 5 mốc lớn: 1858–1918, 1919–1930, 1930–1945, 1945–1954, 1954–1975. Nhớ theo giai đoạn giúp định vị sự kiện cực nhanh.
- **Bước 2: Nắm bản chất qua nguyên tắc 5W1H:** Đây là cách học lịch sử không cần học thuộc hiệu quả nhất. Với mỗi sự kiện, chỉ cần trả lời 6 câu hỏi: Chuyện gì xảy ra (What)? Ai lãnh đạo (Who)? Ở đâu (Where)? Thời điểm nào (When)? Vì sao thắng/thua (Why)? Ý nghĩa/bài học gì (How)?

- **Bước 3: Ghi nhớ bằng sơ đồ tư duy (Mindmap):** Dùng màu sắc, nhánh từ khóa và hình ảnh để giúp não bộ ghi nhớ lâu hơn thay vì chỉ chép nội dung.


| <center>Tiêu chí</center> | <center>Học vẹt truyền thống <br>(Dễ nản, nhanh quên)</center> | <center>Học thông minh <br>(Nhàn, nhớ sâu)</center> |
| :--- | :--- | :--- |
| **Mốc thời gian** | Cố nhớ chính xác từng ngày, tháng, năm | Nắm thứ tự nhân - quả trên trục dòng thời gian |
| **Tài liệu ôn** | Đọc đi đọc lại trang sách chữ dày đặc | Dùng sơ đồ tóm tắt, công cụ tra cứu trực quan |
| **Cách tiếp cận** | Học thuộc lòng câu chữ thụ động | Tự xâu chuỗi câu chuyện như xem một bộ phim |
| **Hiệu quả** | Rất dễ nhầm lẫn số liệu khi vào phòng thi | Nắm vững khung sườn, tự tin đạt 7–8 điểm trắc nghiệm |

![ Áp dụng nguyên tắc 5W1H là cách học lịch sử không cần học thuộc cực kỳ hiệu quả](/images/nguyen-tac-5W1H.jpg)
*Hình 2: Áp dụng nguyên tắc 5W1H là cách học lịch sử không cần học thuộc cực kỳ hiệu quả*

### 3. Bí quyết làm trắc nghiệm Lịch sử điểm cao cho người mất gốc
- **Bắt từ khóa & loại trừ đáp án nhiễu:** Gạch chân ngay từ khóa thời gian và tính chất sự kiện (*"bước ngoặt"*, *"quyết định"*...). Gạch bỏ các đáp án sai lệch mốc thời gian hoặc chứa từ tuyệt đối hóa (*"duy nhất"*, *"hoàn toàn"*).
- **Luyện đề cuốn chiếu theo chuyên đề:** Đừng vội làm đề tổng hợp. Hãy làm chắc câu hỏi nhận biết và thông hiểu của từng bài học để nắm trọn 7 điểm trước khi thử sức câu hỏi vận dụng cao.

![ Áp dụng phương pháp cuốn chiếu vào giải đề là bí quyết lấy gốc môn lịch sử](/images/phuong-phap-cuon-chieu.jpg)
*Hình 3: Áp dụng phương pháp cuốn chiếu vào giải đề là bí quyết lấy gốc môn lịch sử*

### 4. Tối ưu việc ôn tập môn lịch sử cùng Mảnh ghép Hồn Việt
Lịch sử không hề khô khan nếu bạn biết cách tiếp cận qua góc nhìn đa chiều và hình ảnh sinh động. Nếu bạn đang tìm kiếm một nền tảng hỗ trợ ôn tập lại các kiến thức lịch sử một cách trực quan, hãy ghé thăm Mảnh ghép Hồn Việt để tự mình trải nghiệm phương pháp số hóa tư liệu này! 

![ Tham gia trải nghiệm để ôn tập kiến thức lịch sử cùng Mảnh ghép Hồn Việt](/images/giao-dien-game-trai-nghiem-lich-su.jpg)
*Hình 4: Tham gia trải nghiệm để ôn tập kiến thức lịch sử cùng Mảnh ghép Hồn Việt*

### 5. Câu hỏi thường gặp khi lấy gốc môn lịch sử
- **Câu 1:Mất gốc hoàn toàn thì cần bao lâu để lấy gốc môn lịch sử cấp tốc đạt 7 điểm?**  
  *Trả lời:* Với cách học bám sát trục thời gian và rèn luyện trắc nghiệm từ khóa, bạn chỉ mất từ 2 đến 3 tuần (mỗi ngày 45–60 phút) để nắm vững kiến thức đạt mức 7+.
- **Câu 2: Đề thi trắc nghiệm Lịch sử hiện nay có bắt buộc nhớ ngày tháng chi tiết không?**  
  *Trả lời:* Không. Đa số câu hỏi tập trung vào việc nhận biết diễn biến chính, bản chất, nguyên nhân và ý nghĩa của các sự kiện quan trọng chứ không đánh đố ngày tháng lẻ tẻ.
- **Câu 3: Có nên dùng các trang web/app bổ trợ khi ôn thi Lịch sử không?**  
  *Trả lời:* Rất nên. Các công cụ tư liệu trực quan đóng vai trò như một cuốn sổ tay điện tử tiện lợi, giúp bạn củng cố trí nhớ và giảm bớt cảm giác khô khan khi tự học.
- **Câu 4: Người lười nên ghi chép bài học như thế nào để không thấy ngán?**  
  *Trả lời:* Hãy thay đổi thói quen chép văn xuôi bằng các gạch đầu dòng ngắn, vẽ sơ đồ nhánh hoặc ghi chú dạng bảng so sánh để nhìn vào là hiểu ngay.

  Hành trình lấy gốc môn lịch sử sẽ không còn là áp lực nếu bạn áp dụng đúng lộ trình tư duy nhân - quả, tối giản hóa ghi chép và kết hợp hình ảnh trực quan. Hãy chủ động thay đổi thói quen học vẹt ngay hôm nay để tự tin bứt phá điểm số trong các kỳ thi sắp tới. Đừng quên ghé thăm [Mảnh ghép Hồn Việt](https://www.manhghephonviet.com) để khám phá thêm nhiều tài liệu bổ trợ thú vị và biến việc học Lịch sử thành niềm say mê thực thụ!

---
**Bài viết và hình ảnh được thực hiện bởi Mảnh ghép Hồn Việt**`
  },
  {
    id: 'so-hoc-lich-su-co-the-ban-chua-tim-duoc-cach-hoc-phu-hop',
    title: 'Sợ học lịch sử? Có thể bạn chưa tìm được cách học phù hợp',
    excerpt: 'Bạn sợ học lịch sử không phải vì trí nhớ kém, mà vì chưa tìm đúng cách tiếp cận. Cùng Mảnh Ghép Hồn Việt khám phá phương pháp học Lịch sử trực quan, nhập vai!',
    category: 'Góc học tập',
    date: '28/09/2026',
    author: 'Mảnh ghép Hồn Việt',
    image: '/bia_seo_3.jpg',
    content: `**Bạn sợ học lịch sử không phải vì trí nhớ kém, mà vì não bộ đang bị ép ghi nhớ những con số thay vì được thưởng thức một câu chuyện.**
  
  Lịch sử dân tộc vốn là dòng chảy bất tận của nhân tâm, mưu lược và những quyết sách sinh tử trước vận mệnh non sông. Thay vì cố nhồi nhét từng mốc niên đại khô cứng, việc hóa thân vào chính bối cảnh sẽ biến hành trình tìm về cội nguồn thành một niềm say mê tự nhiên.
  
  ### 1. Vì sao nhiều người sợ học lịch sử?
  
  Cảm giác ngột ngạt trước môn Sử chủ yếu đến từ cách tiếp cận một chiều kéo dài suốt nhiều năm:
  
  - **Quá nhiều mốc thời gian và sự kiện:** Não bộ có xu hướng đào thải các niên đại vụn vặt nếu chúng không gắn liền với bối cảnh hay cảm xúc cụ thể.
  - **Khó nhớ nhân vật và địa danh xa lạ:** Tên làng, thế trận xưa bị tách rời khỏi bản đồ thực tế khiến người học khó hình dung cục diện.
  - **Học thuộc lòng nhưng không hiểu câu chuyện:** Thói quen học vẹt để đối phó thi cử chỉ lưu giữ mặt chữ tạm thời, kiến thức sẽ trôi sạch ngay sau bài kiểm tra.
  
  ![Nhiều cột mốc lịch sử khiến người học khó ghi nhớ](/images/cac-cot-moc-lich-su-phat-trien-nuoc.jpg)
  *Hình 1: Nhiều cột mốc lịch sử khiến người học khó ghi nhớ*
  
  ### 2. Học lịch sử như thế nào để dễ hiểu hơn?
  
  Bản chất của sử học là chuỗi liên hoàn của các mối quan hệ nhân quả. Muốn việc tiếp thu trở nên nhẹ nhàng, bạn cần chuyển hướng từ tâm thế “ghi nhớ sự kiện” sang tư duy “giải mã thời cuộc”.
  
  | <center>Tiêu chí so sánh</center> | <center>Lối mòn ghi nhớ truyền thống</center> | <center>Phương pháp tiếp cận hiện đại</center> |
  | :--- | :--- | :--- |
  | **Mục tiêu tiếp nhận** | Cố nhớ chính xác ngày tháng năm | Thấu hiểu bản chất và cục diện sự kiện |
  | **Góc nhìn tư duy** | Tiếp nhận thụ động nội dung có sẵn | Truy vấn căn nguyên bằng câu hỏi "Vì sao?" |
  | **Công cụ hỗ trợ** | Đọc chép, học thuộc từng trang chữ | Sa bàn chiến thuật, đồ họa tương tác, nhập vai |
  | **Hiệu quả thực tế** | Nhanh quên, tạo cảm giác ngột ngạt | Ghi nhớ sâu sắc, khơi dậy niềm tự hào tự nhiên |
  
  #### **Bắt đầu từ câu hỏi “Vì sao?”**
  Thay vì ép bản thân nhớ năm 938 diễn ra trận Bạch Đằng, hãy thử đặt câu hỏi: Vì sao Ngô Quyền lại dùng cọc vạt nhọn mà không phải chiến thuật nào khác? Câu hỏi ấy sẽ dẫn bạn đi sâu vào việc tìm hiểu quy luật thủy triều, đặc tính lòng sông và tầm nhìn quân sự tài tình của bậc tiền nhân.
  
  #### **Đặt sự kiện vào bối cảnh thời cuộc**
  Mỗi quyết định lịch sử đều phản ánh rõ nét sức ép chính trị, xã hội và kinh tế của thời đại đó. Thấu suốt nỗi trăn trở giữ nước thời Trần hay những cải cách mang tính bước ngoặt thời Lê sơ sẽ giúp bạn nhìn nhận hành động của từng nhân vật một cách công bằng, sâu sắc.
  
  #### **Kết nối các sự kiện thành dòng chảy logic**
  Lịch sử nước nhà không phải là những mảnh ghép rời rạc mà là một sợi dây tiếp nối liền mạch. Sự thất bại của một cuộc kháng chiến thường để lại bài học xương máu cho một triều đại quật khởi rực rỡ phía sau.
  
  ![Tổng hợp các sự kiện theo thời gian giúp tăng khả năng ghi nhớ](/images/nhung-cot-moc-lich-su.jpg)
  *Hình 2: Tổng hợp các sự kiện theo thời gian giúp tăng khả năng ghi nhớ*
  
  ### 3. Cách học lịch sử hiệu quả không chỉ nằm ở việc học thuộc
  
  **Cách học lịch sử hiệu quả** là chủ động khơi dậy sự tò mò thay vì tiếp nhận thụ động:
  
  - **Bắt đầu từ chi tiết bạn tò mò:** Khởi đầu bằng một thanh bảo kiếm, bộ chiến bào thời Lý hay một danh tướng bạn kính ngưỡng để làm bàn đạp tìm hiểu toàn bộ giai đoạn.
  - **Tận dụng hình ảnh và không gian:** Quan sát sa bàn thực địa, mô hình phục dựng giúp trí nhớ thị giác ghi dấu ấn sâu sắc hơn vạn dòng chữ tĩnh.
  - **Chủ động đặt mình vào thời cuộc:** Đặt câu hỏi: Nếu đứng trước bài toán vận mệnh giang sơn thuở ấy, quyết sách của bạn sẽ là gì?
  
  ![Mô hình trải nghiệm lịch sử tại Bảo tàng Lịch sử Quốc gia](/images/hoc-lich-su-theo-cach-trai-nghiem.jpg)
  *Hình 3: Mô hình trải nghiệm lịch sử tại Bảo tàng Lịch sử Quốc gia*
  
  ### 4. Trải nghiệm lịch sử: Đánh thức mọi giác quan
  
  **Trải nghiệm lịch sử** đưa người học từ vị thế người quan sát trở thành người trong cuộc:
  
  - **Chuyển hóa dữ liệu thành câu chuyện:** Biến những trang chính sử từ *Đại Việt Sử Ký Toàn Thư*, văn bia cổ thành những thước phim hào hùng, giàu cảm xúc.
  - **Điểm tựa di sản:** Đối chiếu tư liệu với hiện vật khảo cổ học giúp lịch sử không còn là chuyện ngàn năm xa xôi mà gắn liền với từng tấc đất quê hương.
  
  ### 5. Lịch sử không khó, quan trọng là chọn đúng công cụ đồng hành
  
  Lịch sử Việt Nam hào hùng, bi tráng và ly kỳ không thua kém bất kỳ trang sử thi nào trên thế giới. Trở ngại lớn nhất bấy lâu nay nằm ở chỗ người học chưa tìm thấy một phương thức truyền tải đủ khơi gợi niềm xúc động.
  
  Mỗi người đều có một cánh cửa tiếp nhận riêng biệt: người say mê câu chuyện truyền cảm, người rung động trước hình ảnh phục dựng chân thực, và phần đông người trẻ ngày nay hứng thú nhất khi được trực tiếp thao tác, trải nghiệm và tự mình giải mã.
  
  ### 6. Điểm khác biệt tại Mảnh Ghép Hồn Việt: Biến sử thi thành trải nghiệm thực cảnh
  
  Được xây dựng từ tình yêu sâu nặng với cội nguồn dân tộc, **Mảnh Ghép Hồn Việt** ra đời để giúp bạn bước chân vào dòng chảy lịch sử một cách chân thực và tự hào nhất:
  
  - **Nền tảng sử liệu chuẩn xác và nghiêm cẩn:** Từng nhân vật, trận đánh, niên đại đều được khảo cứu, đối chiếu tỉ mỉ dựa trên các bộ chính sử uy tín như *Đại Việt Sử Ký Toàn Thư*, *Khâm Định Việt Sử Thông Giám Cương Mục*.  
  - **Mỹ thuật phục dựng đậm nét văn hóa Việt:** Tuyệt đối tránh xa các tạo hình lai tạp, thiếu căn cứ. Trang phục, hoa văn, giáp trụ và thành lũy đều được nghiên cứu kỹ lưỡng dựa trên các hiện vật khảo cổ học qua từng thời kỳ Lý, Trần, Lê, Nguyễn.  
  - **Trải nghiệm nhập vai tương tác sâu sắc:** Đặt người chơi vào vai trò người trong cuộc, tự tay bố trận, ra quyết sách quân sự và cảm nhận sâu sắc cái giá của từng tấc đất quê hương.  
  - **Hệ thống sơ đồ tư duy liên kết đa chiều:** Tích hợp logic nhân - quả giữa sự kiện, nhân vật và bản đồ địa lý, giúp người ôn tập nắm bắt bản chất vấn đề nhẹ nhàng mà không cần học vẹt.  
  
  ### 7. Câu hỏi thường gặp về cách học và trải nghiệm lịch sử (FAQs)
  
  #### **Người mất gốc kiến thức nên bắt đầu học lịch sử lại từ đâu?**
  Hãy chọn một triều đại hoặc một vị danh tướng mà bạn cảm thấy tò mò, kính ngưỡng nhất để bắt đầu tìm hiểu. Việc nắm vững một giai đoạn cốt lõi sẽ tạo điểm tựa và động lực tự nhiên để bạn mở rộng sang các thời kỳ lân cận.
  
  #### **Làm thế nào để phân biệt giữa dã sử truyền miệng và chính sử?**
  Chính sử là những ghi chép được biên soạn chính thức bởi các sử quan qua các triều đại với niên đại và sự kiện rõ ràng. Dã sử hay truyền thuyết dân gian thường mang nhiều yếu tố hư cấu nghệ thuật, rất giàu cảm xúc nhưng cần được đối chiếu lại cùng thư tịch cổ và di vật khảo cổ khi học tập chuyên sâu.
  
  #### **Trải nghiệm qua game nhập vai có đảm bảo độ chính xác để ôn tập thi cử?**
  Hoàn toàn có thể, với điều kiện nền tảng đó được xây dựng dựa trên sự cố vấn và đối chiếu sử liệu nghiêm túc. Tại **Mảnh Ghép Hồn Việt**, từng bối cảnh chiến trường đến mốc thời gian đều bám sát chính sử, giúp người chơi vừa giải trí nhập vai vừa củng cố kiến thức một cách tự nhiên, chuẩn xác.
  
  #### **Khám phá lịch sử qua công nghệ có thể thay thế hoàn toàn sách vở không?**
  Công nghệ đóng vai trò như chiếc chìa khóa trực quan hóa, giúp khơi dậy niềm say mê và biến con chữ tĩnh thành trải nghiệm sống động. Việc kết hợp giữa trải nghiệm tương tác với đọc tài liệu tra cứu chính là phương pháp học tập toàn diện và sâu sắc nhất.
  
  
  ### **Chạm vào quá khứ hào hùng cùng Mảnh Ghép Hồn Việt**
  
  Nếu bạn đang tìm kiếm một phương pháp ôn tập kiến thức trực quan, chuẩn xác, hay đơn giản là muốn hòa mình vào những trang sử vàng chói lọi của cha ông:
  
  **Mảnh Ghép Hồn Việt** mang đến một không gian tương tác sống động, nơi bạn được trực tiếp điều binh khiển tướng, đối thoại cùng các bậc tiền nhân và tự tay mở khóa từng mảnh ghép hào khí ngàn năm.
  
  **Trải nghiệm ngay hành trình nhập vai lịch sử tại [Mảnh ghép Hồn Việt](https://www.manhghephonviet.com) để việc tìm hiểu sử Việt trở thành niềm tự hào mỗi ngày!**`
  },
  {
    id: 'lich-su-viet-nam-dong-chay-qua-cac-thoi-ky',
    title: 'Lịch sử Việt Nam: Dòng chảy qua các thời kỳ',
    excerpt: 'Lịch sử Việt Nam là một dòng chảy liên tục, nơi mỗi vùng đất, nhân vật và biến cố đều góp phần tạo nên diện mạo đất nước. Cùng Mảnh Ghép Hồn Việt nhìn lại hành trình ấy!',
    category: 'Góc lịch sử Việt',
    date: '28/09/2026',
    author: 'Mảnh ghép Hồn Việt',
    image: '/images/bia_seo_4.jpg',
    likes: 0,
    content: `Lịch sử Việt Nam không chỉ là những con số, niên đại hay danh sách các triều đại cần ghi nhớ. Đó là một dòng chảy liên tục, nơi mỗi vùng đất, nhân vật và biến cố đều góp phần tạo nên diện mạo Việt Nam hôm nay. Từ những dấu tích đầu tiên của thời dựng nước đến các cuộc đấu tranh giành độc lập và quá trình xây dựng đất nước hiện đại, lịch sử chứa đựng những câu chuyện có giá trị vượt xa một bài học trong sách. Cùng Mảnh Ghép Hồn Việt nhìn lại hành trình ấy theo một cách trực quan, kết nối và gần gũi hơn.
  
  ## 1. Lịch sử Việt Nam – dòng chảy hình thành và phát triển của dân tộc
  
  Khi nhắc đến lịch sử, nhiều người thường hình dung trước tiên về những mốc thời gian, tên triều đại hoặc các sự kiện phải ghi nhớ. Cách tiếp cận này giúp hệ thống hóa kiến thức, nhưng nếu chỉ dừng lại ở việc ghi nhớ, lịch sử rất dễ trở thành những dữ kiện rời rạc. Muốn hiểu lịch sử Việt Nam sâu hơn, điều quan trọng là nhìn thấy mối liên hệ giữa các giai đoạn: một biến cố tạo ra thay đổi gì, một vùng đất đóng vai trò thế nào và những con người trong quá khứ đã để lại ảnh hưởng gì cho hiện tại.
  
  ### 1.1. Vì sao cần nhìn lịch sử theo một dòng chảy liên tục?
  
  Lịch sử Việt Nam được hình thành qua hàng nghìn năm với nhiều giai đoạn chuyển tiếp và biến đổi. Các thời kỳ không tồn tại độc lập mà có sự kế thừa về lãnh thổ, văn hóa, tổ chức xã hội, kinh nghiệm dựng nước và giữ nước. Chẳng hạn, khi tìm hiểu quá trình hình thành quốc gia thời cổ, người đọc không nên chỉ ghi nhớ tên gọi hay niên đại. Cần đặt chúng trong bối cảnh đời sống cư dân, điều kiện tự nhiên, hoạt động sản xuất và nhu cầu tổ chức cộng đồng. Từ nền tảng ấy, những thiết chế xã hội và nhà nước sơ khai dần hình thành, tạo tiền đề cho các giai đoạn phát triển tiếp theo. Cách nhìn theo dòng chảy giúp người học trả lời được câu hỏi "vì sao?", thay vì chỉ trả lời "khi nào?". Vì sao một triều đại xuất hiện? Vì sao một cuộc khởi nghĩa bùng nổ? Vì sao một vùng đất trở thành trung tâm chính trị, kinh tế hoặc văn hóa? Khi những câu hỏi ấy được kết nối, kiến thức lịch sử trở nên có logic và dễ ghi nhớ hơn.
  
  ![Lịch sử Việt Nam qua các thời kỳ từ cội nguồn đến hiện đại](/images/lich-su-viet-nam-dong-chay.jpg)
  *Hình 1: Lịch sử Việt Nam là một dòng chảy liên tục qua nhiều thời kỳ và biến chuyển.*

   ### 1.2. Lịch sử không chỉ là những mốc thời gian

   Một sự kiện lịch sử luôn tồn tại trong một không gian và bối cảnh cụ thể. Vì vậy, hiểu lịch sử cần đặt thời gian – con người – vùng đất – sự kiện trong cùng một mối quan hệ. Một trận đánh không chỉ có ngày diễn ra và kết quả. Đằng sau đó còn là địa hình, chiến lược, lực lượng tham gia và những thay đổi sau sự kiện. Một nhân vật lịch sử cũng không nên chỉ được nhớ bằng chức vị hay một hành động nổi bật, mà cần được nhìn trong hoàn cảnh của thời đại. Đây cũng là lý do kiến thức lịch sử có thể trở nên hấp dẫn hơn khi được kể bằng câu chuyện. Thay vì tiếp nhận từng dữ kiện riêng lẻ, người đọc có thể hình dung một hành trình: sự kiện xảy ra ở đâu, ai tham gia, điều gì dẫn đến nó và dấu ấn còn lại là gì. Khi lịch sử được nhìn như một câu chuyện có nguyên nhân, diễn biến và hệ quả, việc tìm hiểu lịch sử Việt Nam không còn đơn thuần là “học thuộc bài”, mà trở thành quá trình khám phá cách một dân tộc được hình thành và phát triển qua thời gian.
  
  ## 2. Lịch sử Việt Nam qua các thời kỳ: từ cội nguồn đến hiện đại
  
  Để có một bức tranh tổng thể, lịch sử Việt Nam thường được tiếp cận theo các giai đoạn lớn. Mỗi thời kỳ có đặc điểm riêng về chính trị, xã hội, văn hóa và lãnh thổ, nhưng đồng thời cũng tạo ra những tiền đề cho giai đoạn sau.
  
  ### 2.1. Từ thời dựng nước đến các triều đại phong kiến

  Những dấu tích khảo cổ học cho thấy cư dân trên lãnh thổ Việt Nam đã hình thành và phát triển những cộng đồng với đời sống vật chất, tinh thần phong phú từ rất sớm. Các nền văn hóa như Phùng Nguyên, Đồng Đậu, Gò Mun và Đông Sơn phản ánh quá trình phát triển lâu dài của cư dân cổ ở khu vực Bắc Bộ và Bắc Trung Bộ. Trong truyền thống lịch sử Việt Nam, thời kỳ Văn Lang – Âu Lạc thường được nhắc đến như một phần quan trọng của giai đoạn dựng nước. Những câu chuyện về các vua Hùng, An Dương Vương hay thành Cổ Loa không chỉ mang giá trị lịch sử mà còn trở thành một phần của ký ức văn hóa dân tộc.Sau đó là một thời kỳ dài chịu ảnh hưởng và tác động từ các thế lực phương Bắc, xen kẽ với nhiều cuộc đấu tranh giành quyền tự chủ. Các cuộc khởi nghĩa Hai Bà Trưng, Bà Triệu, Lý Bí hay chiến thắng Bạch Đằng năm 938 là những dấu mốc quan trọng trong tiến trình giành lại quyền tự chủ.

  Từ thế kỷ X, các nhà nước quân chủ độc lập lần lượt được xây dựng và củng cố qua các triều đại Ngô, Đinh, Tiền Lê, Lý, Trần, Hồ, Lê sơ, Mạc, Lê Trung Hưng, Tây Sơn và Nguyễn. Mỗi triều đại để lại những dấu ấn riêng về tổ chức nhà nước, quân sự, văn hóa, giáo dục và lãnh thổ. Vì vậy, khi học các thời kỳ lịch sử Việt Nam, không nên xem các triều đại như những “ngăn kéo” riêng biệt. Chúng là những mắt xích trong một quá trình lâu dài của xây dựng quốc gia và bảo vệ chủ quyền.

   ### 2.2. Từ thời kỳ đấu tranh giành độc lập đến Việt Nam hiện đại

   Bước sang thế kỷ XIX và XX, lịch sử Việt Nam chuyển sang một giai đoạn có nhiều biến động sâu sắc. Sự hiện diện của thực dân Pháp, các phong trào yêu nước cuối thế kỷ XIX – đầu thế kỷ XX, sự ra đời của các tổ chức chính trị mới và những biến chuyển của xã hội đã tạo nên một thời kỳ đấu tranh quyết liệt.Cách mạng Tháng Tám năm 1945 mở ra một bước ngoặt lớn với sự ra đời của nước Việt Nam Dân chủ Cộng hòa. Sau đó, Việt Nam tiếp tục trải qua các cuộc chiến tranh kéo dài, trong đó có Chiến tranh Đông Dương và Chiến tranh Việt Nam, trước khi đất nước thống nhất năm 1975.

   Từ sau thống nhất, Việt Nam bước vào quá trình khôi phục và xây dựng đất nước. Công cuộc Đổi mới từ năm 1986 tạo ra những thay đổi quan trọng về kinh tế, xã hội và hội nhập quốc tế. Nhìn từ hiện tại, mỗi giai đoạn đều góp phần giải thích một phần diện mạo Việt Nam hôm nay. Vì thế, kiến thức lịch sử Việt Nam có giá trị không chỉ trong việc hiểu quá khứ mà còn giúp chúng ta nhận diện nguồn gốc của nhiều thay đổi trong xã hội hiện đại.

   Bảng khái quát các thời kỳ lịch sử Việt Nam:

  | <center>Giai đoạn</center> | <center>Thời gian khái quát</center> | <center>Nội dung chính</center> |<center>Dấu mốc tiêu biểu</center> |
  | :--- | :--- | :--- | :--- |
  | **Thời kỳ dựng nước** | Khoảng thiên niên kỷ II–I TCN đến thế kỷ II TCN |Hình thành các cộng đồng cư dân và nhà nước sơ khai; tiêu biểu là Văn Lang và Âu Lạc | Văn hóa Đông Sơn, nhà nước Văn Lang, Âu Lạc, thành Cổ Loa |
  | **Thời kỳ Bắc thuộc và đấu tranh giành quyền tự chủ** | 179 TCN – 938 | Chống sự cai trị từ phương Bắc, từng bước giành quyền tự chủ | Hai Bà Trưng, Bà Triệu, Lý Bí, Phùng Hưng, Khúc Thừa Dụ, chiến thắng Bạch Đằng năm 938 |
  | **TThời kỳ quốc gia phong kiến độc lập** | 938 – giữa thế kỷ XIX | Xây dựng nhà nước, phát triển lãnh thổ, kinh tế và văn hóa | Ngô, Đinh, Tiền Lê, Lý, Trần, Hồ, Lê sơ, Mạc, Lê Trung Hưng, Tây Sơn, Nguyễn |
  | **Thời kỳ Pháp thuộc và phong trào đấu tranh giải phóng dân tộc** | 1858 – 1945 | Kháng chiến chống Pháp và hình thành các phong trào yêu nước | Phong trào Cần Vương, Đông Du, Duy Tân, Cách mạng Tháng Tám |
  | **Đấu tranh giành độc lập và thống nhất** | 1945 – 1975 | Kháng chiến chống Pháp, chống Mỹ và thống nhất đất nước | Độc lập 1945, Điện Biên Phủ 1954, Hiệp định Paris 1973, thống nhất 1975 |
  | **Xây dựng và phát triển đất nước** | 1975 – nay | Khôi phục, Đổi mới và hội nhập quốc tế | Đổi mới 1986, hội nhập và phát triển |

  ![Các thời kỳ lịch sử Việt Nam trên dòng thời gian](/images/cac-thoi-ki-lich-su-viet-nam-timeline.jpg)
  *Hình 2: Các thời kỳ lịch sử Việt Nam được kết nối theo dòng thời gian để dễ hình dung tổng thể.*

  ### 3. Mảnh Ghép Hồn Việt – Kết nối các mảnh ghép lịch sử Việt Nam
  
  Một trong những cách tiếp cận hiệu quả để hiểu lịch sử là không tách sự kiện khỏi con người và không tách con người khỏi không gian lịch sử. Một câu chuyện chỉ thực sự có chiều sâu khi người đọc biết nó diễn ra ở đâu, trong hoàn cảnh nào và để lại dấu ấn gì.
  
### 3.1. Nhìn lịch sử qua những sự kiện và nhân vật tiêu biểu

Trong lịch sử Việt Nam có hàng nghìn sự kiện và nhân vật đáng tìm hiểu. Tuy nhiên, việc ghi nhớ toàn bộ một cách máy móc thường không phải cách hiệu quả để hiểu lịch sử.

Có thể bắt đầu từ những dấu mốc lớn như chiến thắng Bạch Đằng năm 938, chiến thắng Bạch Đằng năm 1288, phong trào Tây Sơn, Cách mạng Tháng Tám năm 1945, Chiến thắng Điện Biên Phủ năm 1954 hay sự kiện thống nhất đất nước năm 1975.

Mỗi sự kiện lại mở ra một mạng lưới kiến thức rộng hơn. Từ Bạch Đằng có thể tìm hiểu về Ngô Quyền, địa hình sông nước và nghệ thuật quân sự. Từ Điện Biên Phủ có thể tìm hiểu về bối cảnh chiến tranh Đông Dương, chiến dịch, con người và ý nghĩa lịch sử của chiến thắng.

Cách học này tạo ra liên kết kiến thức thay vì những mảnh thông tin rời rạc. Khi một nhân vật gắn với một sự kiện, một sự kiện gắn với một địa điểm và địa điểm ấy gắn với một giai đoạn, khả năng ghi nhớ và hiểu bản chất vấn đề sẽ được củng cố.

### 3.2. Mỗi vùng đất là một mảnh ghép của lịch sử Việt Nam

Lịch sử không chỉ nằm trong sách. Lịch sử còn hiện diện trong những địa danh, di tích, công trình kiến trúc, bảo tàng và không gian văn hóa trên khắp đất nước.

Hà Nội gắn với nhiều lớp lịch sử của Thăng Long – Đông Đô – Đông Quan – Đông Kinh. Huế lưu giữ dấu ấn rõ nét của thời Nguyễn với hệ thống kinh thành, cung điện và lăng tẩm. Quảng Trị gắn với nhiều dấu tích của một thời kỳ chiến tranh khốc liệt. TP.HCM phản ánh quá trình biến đổi từ vùng đất Gia Định đến một đô thị hiện đại.

Khi đặt những địa danh ấy lên bản đồ, lịch sử trở nên cụ thể hơn. Người đọc không còn nhìn một sự kiện như một điểm xa xôi trong quá khứ mà có thể xác định nó diễn ra ở đâu và dấu tích còn lại ở đâu.

![Bản đồ lịch sử Việt Nam kết nối các vùng đất và di tích](/images/ban-do-viet-nam-ket-noi-di-tich.jpg)
  *Hình 3: Mỗi vùng đất là một mảnh ghép góp phần tạo nên dòng chảy lịch sử Việt Nam.*

  Chính từ cách nhìn mỗi vùng đất như một mảnh ghép riêng, Mảnh Ghép Hồn Việt phát triển trải nghiệm bản đồ lịch sử theo hướng kết nối địa danh với câu chuyện phía sau. Thay vì chỉ xem tên một tỉnh, thành trên bản đồ, người dùng có thể bắt đầu khám phá những dấu ấn lịch sử, văn hóa gắn với vùng đất đó. Cách tiếp cận này giúp bản đồ không chỉ là công cụ định vị mà trở thành điểm bắt đầu cho một hành trình tìm hiểu lịch sử Việt Nam trực quan và gần gũi hơn.

  ### 4. Câu hỏi thường gặp về lịch sử Việt Nam
  
  #### **Lịch sử Việt Nam gồm những thời kỳ nào?**
  Có nhiều cách phân kỳ khác nhau tùy mục đích nghiên cứu. Ở góc nhìn phổ thông, có thể khái quát từ thời dựng nước, thời kỳ đấu tranh giành quyền tự chủ, các triều đại phong kiến, thời Pháp thuộc, giai đoạn 1945–1975 và thời kỳ Việt Nam từ sau năm 1975 đến nay.
  
  #### **Nên bắt đầu tìm hiểu lịch sử Việt Nam từ đâu?**
  Có thể bắt đầu bằng một dòng thời gian tổng quan, sau đó chọn một giai đoạn hoặc sự kiện mình quan tâm để tìm hiểu sâu hơn. Cách này giúp hình thành khung kiến thức trước khi đi vào chi tiết.
  
  #### **Làm thế nào để nhớ lịch sử dễ hơn?**
  Thay vì chỉ học thuộc niên đại, hãy kết nối thời gian – sự kiện – nhân vật – địa điểm – nguyên nhân – kết quả. Sơ đồ tư duy, timeline và bản đồ lịch sử cũng có thể hỗ trợ ghi nhớ tốt hơn.
  
  #### **Bản đồ lịch sử Việt Nam có thể giúp ích gì?**
  Bản đồ giúp đặt các sự kiện và di tích vào đúng không gian địa lý, từ đó làm rõ mối liên hệ giữa vùng đất, con người và lịch sử. Với bản đồ tương tác, người dùng còn có thể chủ động khám phá từng địa phương theo nhu cầu.`
  }
];
export const FEATURED_WEEKLY_ARTICLES = [
  {
    id: 'f-01',
    title: 'Chiến dịch Điện Biên Phủ - Lừng lẫy năm châu, chấn động địa cầu',
    date: '25/08/2026',
    views: '3.4k',
    likes: '3.4k',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'f-02',
    title: 'Tục thờ cúng Hùng Vương - Cội nguồn thiêng liêng người Việt',
    date: '24/08/2026',
    views: '2.1k',
    likes: '2.1k',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'f-03',
    title: 'Nét đẹp Chợ nổi Cái Răng - Hồn sông nước miền Tây Nam Bộ',
    date: '22/08/2026',
    views: '1.9k',
    likes: '1.9k',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80'
  }
];

export const LEADERBOARD = [
  { rank: 1, name: 'Nguyễn Minh Anh', xp: 12560, badge: 'Thủ Lĩnh Di Sản', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' },
  { rank: 2, name: 'Trần Hoàng Nam', xp: 9850, badge: 'Nhà Ký Sử', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' },
  { rank: 3, name: 'Lê Quỳnh Trang', xp: 8450, badge: 'Sứ Giả Văn Hóa', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' },
  { rank: 4, name: 'Phạm Đức Huy', xp: 7920, badge: 'Thám Hiểm Gia', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200' },
  { rank: 5, name: 'Hoàng Mai Linh', xp: 7350, badge: 'Người Giữ Sử', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' },
  { rank: 6, name: 'Vũ Quốc Hùng', xp: 6890, badge: 'Cổ Vật Gia', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200' },
  { rank: 7, name: 'Đặng Thu Thảo', xp: 6420, badge: 'Biên Tập Viên', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200' },
  { rank: 8, name: 'Bùi Gia Bảo', xp: 5980, badge: 'Tình Nguyện Viên', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200' },
  { rank: 9, name: 'Nguyễn Khánh Linh', xp: 5410, badge: 'Độc Giả Tích Cực', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200' },
  { rank: 10, name: 'Lê Tuấn Kiệt', xp: 4890, badge: 'Thành Viên Mới', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200' }
];