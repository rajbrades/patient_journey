-- Seed data: 10X Health goals and tests

-- Goals
insert into goals (name, slug, description, icon, category, sort_order) values
  ('Increase Energy', 'increase-energy', 'Feeling fatigued or sluggish? Identify the root causes of low energy through targeted lab testing.', '⚡', 'vitality', 1),
  ('Evaluate My Hormones', 'evaluate-hormones', 'Get a comprehensive look at your hormonal health — from thyroid to sex hormones to adrenal function.', '🧬', 'hormones', 2),
  ('Improve Gut Health', 'improve-gut-health', 'Digestive issues, bloating, or food sensitivities? Uncover what''s happening in your gut.', '🫁', 'digestive', 3),
  ('Optimize Athletic Performance', 'optimize-performance', 'Train smarter by understanding your body''s recovery, inflammation, and nutrient status.', '🏋️', 'performance', 4),
  ('Support Weight Management', 'support-weight-management', 'Struggling with weight? Lab testing can reveal metabolic, hormonal, and nutritional factors.', '⚖️', 'metabolism', 5),
  ('Boost Immune Health', 'boost-immune-health', 'Strengthen your immune system by identifying deficiencies and inflammatory markers.', '🛡️', 'immune', 6),
  ('Improve Sleep Quality', 'improve-sleep', 'Poor sleep affects everything. Test the hormones and nutrients that regulate your sleep cycle.', '😴', 'vitality', 7),
  ('Assess Heart Health', 'assess-heart-health', 'Go beyond basic cholesterol. Get a detailed cardiovascular risk assessment.', '❤️', 'cardiovascular', 8),
  ('Enhance Mental Clarity', 'enhance-mental-clarity', 'Brain fog, poor focus, or mood swings? Identify the biochemical drivers.', '🧠', 'cognitive', 9),
  ('Anti-Aging & Longevity', 'anti-aging-longevity', 'Optimize the biomarkers associated with healthy aging and cellular vitality.', '🕰️', 'longevity', 10);

-- Tests
insert into tests (name, slug, description, category, biomarkers, price_cents) values
  ('Complete Blood Count (CBC)', 'cbc', 'Measures red and white blood cells, hemoglobin, hematocrit, and platelets.', 'blood', array['WBC', 'RBC', 'Hemoglobin', 'Hematocrit', 'Platelets', 'MCV', 'MCH', 'MCHC'], 4900),
  ('Comprehensive Metabolic Panel (CMP)', 'cmp', 'Evaluates kidney function, liver function, electrolytes, and blood sugar.', 'blood', array['Glucose', 'BUN', 'Creatinine', 'Sodium', 'Potassium', 'Calcium', 'ALT', 'AST', 'Albumin'], 5900),
  ('Thyroid Panel', 'thyroid-panel', 'Full thyroid assessment including TSH, Free T3, Free T4, and thyroid antibodies.', 'hormones', array['TSH', 'Free T3', 'Free T4', 'TPO Antibodies', 'Thyroglobulin Antibodies'], 8900),
  ('Male Hormone Panel', 'male-hormone-panel', 'Comprehensive male hormone testing including testosterone, estradiol, DHEA-S, and more.', 'hormones', array['Total Testosterone', 'Free Testosterone', 'Estradiol', 'DHEA-S', 'SHBG', 'LH', 'FSH', 'Prolactin'], 14900),
  ('Female Hormone Panel', 'female-hormone-panel', 'Comprehensive female hormone testing including estradiol, progesterone, testosterone, and more.', 'hormones', array['Estradiol', 'Progesterone', 'Total Testosterone', 'Free Testosterone', 'DHEA-S', 'SHBG', 'LH', 'FSH', 'Prolactin'], 14900),
  ('Iron Panel', 'iron-panel', 'Evaluates iron status including serum iron, ferritin, TIBC, and transferrin saturation.', 'blood', array['Serum Iron', 'Ferritin', 'TIBC', 'Transferrin Saturation'], 5900),
  ('Vitamin D', 'vitamin-d', 'Measures 25-hydroxyvitamin D levels — critical for immune function, mood, and bone health.', 'vitamins', array['25-OH Vitamin D'], 4900),
  ('Vitamin B12 & Folate', 'b12-folate', 'Assesses B12 and folate levels important for energy, mood, and neurological function.', 'vitamins', array['Vitamin B12', 'Folate'], 5900),
  ('Lipid Panel (Advanced)', 'advanced-lipid-panel', 'Advanced cardiovascular markers beyond standard cholesterol.', 'cardiovascular', array['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'VLDL', 'Lp(a)', 'ApoB', 'LDL Particle Number'], 9900),
  ('hs-CRP & Inflammation', 'hs-crp-inflammation', 'Measures high-sensitivity C-reactive protein and other inflammatory markers.', 'inflammation', array['hs-CRP', 'ESR', 'Homocysteine'], 6900),
  ('Cortisol (AM)', 'cortisol-am', 'Morning cortisol level to assess adrenal function and stress response.', 'hormones', array['Cortisol (AM)'], 4900),
  ('HbA1c', 'hba1c', 'Measures average blood sugar over the past 2-3 months.', 'metabolic', array['HbA1c'], 3900),
  ('Insulin (Fasting)', 'fasting-insulin', 'Evaluates insulin levels to assess metabolic health and insulin resistance.', 'metabolic', array['Fasting Insulin'], 4900),
  ('DHEA-S', 'dhea-s', 'Measures DHEA-sulfate, an important precursor hormone for both men and women.', 'hormones', array['DHEA-S'], 4900),
  ('Magnesium (RBC)', 'magnesium-rbc', 'Red blood cell magnesium — more accurate than serum for assessing true magnesium status.', 'vitamins', array['RBC Magnesium'], 4900),
  ('GI-MAP Stool Test', 'gi-map', 'Comprehensive stool analysis for gut pathogens, parasites, bacterial balance, and digestive function.', 'gut', array['H. pylori', 'Candida', 'Parasites', 'Calprotectin', 'Elastase', 'SIgA', 'Zonulin'], 34900),
  ('Food Sensitivity Panel', 'food-sensitivity', 'IgG-mediated food sensitivity testing for 96+ common foods.', 'gut', array['IgG Food Antibodies'], 29900),
  ('Omega-3 Index', 'omega-3-index', 'Measures omega-3 fatty acid levels in red blood cell membranes.', 'cardiovascular', array['Omega-3 Index', 'EPA', 'DHA', 'AA:EPA Ratio'], 9900),
  ('IGF-1', 'igf-1', 'Insulin-like growth factor 1 — marker for growth hormone activity and longevity.', 'longevity', array['IGF-1'], 5900),
  ('Comprehensive Wellness Panel', 'comprehensive-wellness', 'Our most complete panel — CBC, CMP, thyroid, hormones, vitamins, lipids, and inflammation markers.', 'comprehensive', array['CBC', 'CMP', 'TSH', 'Free T3', 'Free T4', 'Testosterone', 'Estradiol', 'Vitamin D', 'B12', 'Iron', 'Ferritin', 'hs-CRP', 'HbA1c', 'Lipid Panel'], 29900);

-- Goal-Test Mappings

-- Increase Energy
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('increase-energy', 'thyroid-panel', 'primary', 'Thyroid dysfunction is the #1 overlooked cause of fatigue', 1),
  ('increase-energy', 'iron-panel', 'primary', 'Iron deficiency anemia is a leading cause of low energy', 2),
  ('increase-energy', 'b12-folate', 'primary', 'B12 deficiency causes fatigue and brain fog', 3),
  ('increase-energy', 'cbc', 'primary', 'Rules out anemia and blood cell abnormalities', 4),
  ('increase-energy', 'vitamin-d', 'secondary', 'Low vitamin D is associated with fatigue and low mood', 5),
  ('increase-energy', 'cortisol-am', 'secondary', 'Abnormal cortisol patterns cause energy crashes', 6),
  ('increase-energy', 'cmp', 'secondary', 'Checks blood sugar, electrolytes, and organ function', 7)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Evaluate My Hormones
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('evaluate-hormones', 'male-hormone-panel', 'primary', 'Complete male hormonal assessment', 1),
  ('evaluate-hormones', 'female-hormone-panel', 'primary', 'Complete female hormonal assessment', 2),
  ('evaluate-hormones', 'thyroid-panel', 'primary', 'Thyroid is central to hormonal balance', 3),
  ('evaluate-hormones', 'cortisol-am', 'primary', 'Cortisol impacts all other hormones', 4),
  ('evaluate-hormones', 'dhea-s', 'secondary', 'Key precursor hormone for testosterone and estrogen', 5),
  ('evaluate-hormones', 'fasting-insulin', 'secondary', 'Insulin resistance disrupts hormonal balance', 6)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Improve Gut Health
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('improve-gut-health', 'gi-map', 'primary', 'Gold standard for comprehensive gut assessment', 1),
  ('improve-gut-health', 'food-sensitivity', 'primary', 'Identifies immune reactions to common foods', 2),
  ('improve-gut-health', 'cmp', 'secondary', 'Checks liver function and nutrient absorption markers', 3),
  ('improve-gut-health', 'vitamin-d', 'secondary', 'Vitamin D is critical for gut barrier integrity', 4),
  ('improve-gut-health', 'hs-crp-inflammation', 'secondary', 'Systemic inflammation often originates in the gut', 5)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Optimize Athletic Performance
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('optimize-performance', 'cbc', 'primary', 'Oxygen-carrying capacity and recovery markers', 1),
  ('optimize-performance', 'iron-panel', 'primary', 'Iron is essential for oxygen transport and endurance', 2),
  ('optimize-performance', 'male-hormone-panel', 'primary', 'Testosterone drives muscle recovery and growth', 3),
  ('optimize-performance', 'hs-crp-inflammation', 'primary', 'Tracks overtraining and recovery status', 4),
  ('optimize-performance', 'magnesium-rbc', 'secondary', 'Magnesium is critical for muscle function and recovery', 5),
  ('optimize-performance', 'vitamin-d', 'secondary', 'Affects muscle strength and injury risk', 6),
  ('optimize-performance', 'cortisol-am', 'secondary', 'Monitors stress load from training', 7),
  ('optimize-performance', 'omega-3-index', 'secondary', 'Anti-inflammatory support for recovery', 8)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Support Weight Management
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('support-weight-management', 'thyroid-panel', 'primary', 'Thyroid controls metabolic rate', 1),
  ('support-weight-management', 'fasting-insulin', 'primary', 'Insulin resistance is the #1 driver of weight gain', 2),
  ('support-weight-management', 'hba1c', 'primary', 'Reveals long-term blood sugar control', 3),
  ('support-weight-management', 'cmp', 'primary', 'Checks blood sugar and liver function', 4),
  ('support-weight-management', 'cortisol-am', 'secondary', 'High cortisol promotes belly fat storage', 5),
  ('support-weight-management', 'male-hormone-panel', 'secondary', 'Low testosterone is linked to weight gain in men', 6),
  ('support-weight-management', 'female-hormone-panel', 'secondary', 'Hormonal imbalances affect weight in women', 7)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Boost Immune Health
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('boost-immune-health', 'vitamin-d', 'primary', 'Vitamin D is the most important immune-regulating nutrient', 1),
  ('boost-immune-health', 'cbc', 'primary', 'White blood cell count and differential assess immune function', 2),
  ('boost-immune-health', 'hs-crp-inflammation', 'primary', 'Chronic inflammation suppresses immune response', 3),
  ('boost-immune-health', 'iron-panel', 'secondary', 'Iron is needed for immune cell proliferation', 4),
  ('boost-immune-health', 'b12-folate', 'secondary', 'B12 deficiency impairs immune function', 5),
  ('boost-immune-health', 'magnesium-rbc', 'secondary', 'Magnesium supports immune signaling', 6)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Improve Sleep Quality
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('improve-sleep', 'cortisol-am', 'primary', 'Dysregulated cortisol rhythm disrupts sleep', 1),
  ('improve-sleep', 'magnesium-rbc', 'primary', 'Magnesium deficiency is a common cause of insomnia', 2),
  ('improve-sleep', 'thyroid-panel', 'primary', 'Hyperthyroidism causes insomnia; hypothyroidism causes excessive sleepiness', 3),
  ('improve-sleep', 'iron-panel', 'secondary', 'Iron deficiency is linked to restless leg syndrome', 4),
  ('improve-sleep', 'vitamin-d', 'secondary', 'Low vitamin D is associated with poor sleep quality', 5),
  ('improve-sleep', 'b12-folate', 'secondary', 'B12 helps regulate circadian rhythm', 6)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Assess Heart Health
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('assess-heart-health', 'advanced-lipid-panel', 'primary', 'Advanced lipid markers give a complete cardiovascular picture', 1),
  ('assess-heart-health', 'hs-crp-inflammation', 'primary', 'Inflammation is a key driver of heart disease', 2),
  ('assess-heart-health', 'hba1c', 'primary', 'Diabetes significantly increases cardiovascular risk', 3),
  ('assess-heart-health', 'omega-3-index', 'primary', 'Omega-3 levels are inversely correlated with heart disease risk', 4),
  ('assess-heart-health', 'cmp', 'secondary', 'Checks electrolytes and kidney function relevant to heart health', 5),
  ('assess-heart-health', 'fasting-insulin', 'secondary', 'Insulin resistance is a major CVD risk factor', 6)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Enhance Mental Clarity
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('enhance-mental-clarity', 'thyroid-panel', 'primary', 'Brain fog is a hallmark symptom of thyroid dysfunction', 1),
  ('enhance-mental-clarity', 'b12-folate', 'primary', 'B12 deficiency causes cognitive impairment', 2),
  ('enhance-mental-clarity', 'iron-panel', 'primary', 'Iron deficiency reduces oxygen delivery to the brain', 3),
  ('enhance-mental-clarity', 'vitamin-d', 'secondary', 'Low vitamin D is linked to cognitive decline', 4),
  ('enhance-mental-clarity', 'omega-3-index', 'secondary', 'Omega-3s are essential for brain cell membrane integrity', 5),
  ('enhance-mental-clarity', 'cortisol-am', 'secondary', 'Chronic stress impairs memory and focus', 6),
  ('enhance-mental-clarity', 'magnesium-rbc', 'secondary', 'Magnesium supports neurotransmitter function', 7)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Anti-Aging & Longevity
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('anti-aging-longevity', 'comprehensive-wellness', 'primary', 'Broad baseline of all key longevity biomarkers', 1),
  ('anti-aging-longevity', 'igf-1', 'primary', 'Growth hormone marker linked to cellular aging', 2),
  ('anti-aging-longevity', 'hs-crp-inflammation', 'primary', 'Chronic inflammation accelerates aging', 3),
  ('anti-aging-longevity', 'hba1c', 'primary', 'Glycemic control is a top longevity predictor', 4),
  ('anti-aging-longevity', 'fasting-insulin', 'primary', 'Insulin sensitivity is key to metabolic longevity', 5),
  ('anti-aging-longevity', 'omega-3-index', 'secondary', 'Higher omega-3 levels associated with longer telomeres', 6),
  ('anti-aging-longevity', 'vitamin-d', 'secondary', 'Optimal vitamin D linked to reduced all-cause mortality', 7),
  ('anti-aging-longevity', 'dhea-s', 'secondary', 'DHEA-S declines with age — a key aging biomarker', 8)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;
