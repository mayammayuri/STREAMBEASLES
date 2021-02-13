<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Shortcode attributes
 * @var $atts
 * @var $el_class
 * @var $full_width
 * @var $full_height
 * @var $equal_height
 * @var $columns_placement
 * @var $content_placement
 * @var $parallax
 * @var $parallax_image
 * @var $css
 * @var $el_id
 * @var $video_bg
 * @var $video_bg_url
 * @var $video_bg_parallax
 * @var $parallax_speed_bg
 * @var $parallax_speed_video
 * @var $content - shortcode content
 * @var $css_animation
 * Shortcode class
 * @var $this WPBakeryShortCode_VC_Row
 */
$el_class = $full_height = $parallax_speed_bg = $parallax_speed_video = $css_animation = $full_width = $equal_height = $flex_row = $columns_placement = $content_placement = $parallax = $parallax_image = $css = $el_id = $video_bg = $video_bg_url = $video_bg_parallax = '';
$disable_element = '';
$output = $after_output = '';

/***** Our code modification - begin *****/

$row_content_width = $anchor = $content_text_aligment = $simple_background_color = $simple_background_image = $background_image_position = $disable_background_image = $parallax_background_image = $parallax_bg_speed = $parallax_bg_height = $row_shadow = '';
$edgtf_row_wrapper_start = $edgtf_row_wrapper_end = $edgtf_row_before_wrapper_close = $edgtf_row_after_wrapper_open = '';

/***** Our code modification - end *****/

$atts = vc_map_get_attributes( $this->getShortcode(), $atts );
extract( $atts );

wp_enqueue_script( 'wpb_composer_front_js' );

$el_class = $this->getExtraClass( $el_class ) . $this->getCSSAnimation( $css_animation );

$css_classes = array(
	'vc_row',
	'wpb_row', //deprecated
	'vc_row-fluid',
	$el_class,
	vc_shortcode_custom_css_class( $css ),
);

if ( 'yes' === $disable_element ) {
	if ( vc_is_page_editable() ) {
		$css_classes[] = 'vc_hidden-lg vc_hidden-xs vc_hidden-sm vc_hidden-md';
	} else {
		return '';
	}
}

if (vc_shortcode_custom_css_has_property( $css, array('border', 'background') ) || $video_bg || $parallax) {
	$css_classes[]='vc_row-has-fill';
}

if (!empty($atts['gap'])) {
	$css_classes[] = 'vc_column-gap-'.$atts['gap'];
}

$wrapper_attributes = array();
// build attributes for wrapper
if ( ! empty( $el_id ) ) {
	$wrapper_attributes[] = 'id="' . esc_attr( $el_id ) . '"';
}

if ( ! empty( $full_width ) ) {
	$wrapper_attributes[] = 'data-vc-full-width="true"';
	$wrapper_attributes[] = 'data-vc-full-width-init="false"';
	if ( 'stretch_row_content' === $full_width ) {
		$wrapper_attributes[] = 'data-vc-stretch-content="true"';
	} elseif ( 'stretch_row_content_no_spaces' === $full_width ) {
		$wrapper_attributes[] = 'data-vc-stretch-content="true"';
		$css_classes[] = 'vc_row-no-padding';
	}
	$after_output .= '<div class="vc_row-full-width vc_clearfix"></div>';
}

if ( ! empty( $full_height ) ) {
	$css_classes[] = 'vc_row-o-full-height';
	if ( ! empty( $columns_placement ) ) {
		$flex_row = true;
		$css_classes[] = 'vc_row-o-columns-' . $columns_placement;
		if ( 'stretch' === $columns_placement ) {
			$css_classes[] = 'vc_row-o-equal-height';
		}
	}
}

if ( ! empty( $equal_height ) ) {
	$flex_row = true;
	$css_classes[] = 'vc_row-o-equal-height';
}

if ( ! empty( $content_placement ) ) {
	$flex_row = true;
	$css_classes[] = 'vc_row-o-content-' . $content_placement;
}

if ( ! empty( $flex_row ) ) {
	$css_classes[] = 'vc_row-flex';
}

$has_video_bg = ( ! empty( $video_bg ) && ! empty( $video_bg_url ) && vc_extract_youtube_id( $video_bg_url ) );

$parallax_speed = $parallax_speed_bg;
if ( $has_video_bg ) {
	$parallax = $video_bg_parallax;
	$parallax_speed = $parallax_speed_video;
	$parallax_image = $video_bg_url;
	$css_classes[] = 'vc_video-bg-container';
	wp_enqueue_script( 'vc_youtube_iframe_api_js' );
}

if ( ! empty( $parallax ) ) {
	wp_enqueue_script( 'vc_jquery_skrollr_js' );
	$wrapper_attributes[] = 'data-vc-parallax="' . esc_attr( $parallax_speed ) . '"'; // parallax speed
	$css_classes[] = 'vc_general vc_parallax vc_parallax-' . $parallax;
	if ( false !== strpos( $parallax, 'fade' ) ) {
		$css_classes[] = 'js-vc_parallax-o-fade';
		$wrapper_attributes[] = 'data-vc-parallax-o-fade="on"';
	} elseif ( false !== strpos( $parallax, 'fixed' ) ) {
		$css_classes[] = 'js-vc_parallax-o-fixed';
	}
}

if ( ! empty( $parallax_image ) ) {
	if ( $has_video_bg ) {
		$parallax_image_src = $parallax_image;
	} else {
		$parallax_image_id = preg_replace( '/[^\d]/', '', $parallax_image );
		$parallax_image_src = wp_get_attachment_image_src( $parallax_image_id, 'full' );
		if ( ! empty( $parallax_image_src[0] ) ) {
			$parallax_image_src = $parallax_image_src[0];
		}
	}
	$wrapper_attributes[] = 'data-vc-parallax-image="' . esc_attr( $parallax_image_src ) . '"';
}
if ( ! $parallax && $has_video_bg ) {
	$wrapper_attributes[] = 'data-vc-video-bg="' . esc_attr( $video_bg_url ) . '"';
}

/***** Our code modification - begin *****/

if ( ! empty( $anchor ) ) {
	$wrapper_attributes[] = 'data-edgtf-anchor="' . esc_attr( $anchor ) . '"';
}

$grid_row_class = $grid_row_data = $edgtf_vc_row_style = $edgtf_grid_row_style = array();

if ( $row_content_width !== 'grid' ) {
	if ( ! empty( $disable_background_image ) ) {
		$css_classes[] = 'edgtf-disabled-bg-image-bellow-' . esc_attr( $disable_background_image );
	}
	
	if ( ! empty( $simple_background_color ) ) {
		$edgtf_vc_row_style[] = 'background-color:' . esc_attr( $simple_background_color );
	}
	
	if ( ! empty( $simple_background_image ) ) {
		$image_src            = wp_get_attachment_image_src( $simple_background_image, 'full' );
		$edgtf_vc_row_style[] = 'background-image: url(' . esc_url( $image_src[0] ) . ')';
	}
	
	if ( ! empty( $background_image_position ) ) {
		$edgtf_vc_row_style[] = 'background-position: ' . esc_attr( $background_image_position );
	}
	
	if ( ! empty( $parallax_background_image ) ) {
		$image_src = wp_get_attachment_image_src( $parallax_background_image, 'full' );
		
		$css_classes[]        = 'edgtf-parallax-row-holder';
		$wrapper_attributes[] = 'data-parallax-bg-image="' . esc_url( $image_src[0] ) . '"';
		
		if ( $parallax_bg_speed !== '' ) {
			$wrapper_attributes[] = 'data-parallax-bg-speed="' . esc_attr( $parallax_bg_speed ) . '"';
		} else {
			$wrapper_attributes[] = 'data-parallax-bg-speed="1"';
		}
		
		if ( ! empty( $parallax_bg_height ) ) {
			$wrapper_attributes[] = 'data-parallax-bg-height="' . esc_attr( $parallax_bg_height ) . '"';
		}
	}

	if( $row_shadow === 'with-shadow') {
        $css_classes[] = 'edgtf-row-with-shadow';
    }
	
	if ( ! empty( $content_text_aligment ) ) {
		$css_classes[] = 'edgtf-content-aligment-' . esc_attr( $content_text_aligment );
	}
	
} else {
	if ( ! empty( $disable_background_image ) ) {
		$grid_row_class[] = 'edgtf-disabled-bg-image-bellow-' . esc_attr( $disable_background_image );
	}
	
	if ( ! empty( $simple_background_color ) ) {
		$edgtf_grid_row_style[] = 'background-color:' . esc_attr( $simple_background_color );
	}
	
	if ( ! empty( $simple_background_image ) ) {
		$image_src              = wp_get_attachment_image_src( $simple_background_image, 'full' );
		$edgtf_grid_row_style[] = 'background-image: url(' . esc_url( $image_src[0] ) . ')';
	}
	
	if ( ! empty( $background_image_position ) ) {
		$edgtf_grid_row_style[] = 'background-position: ' . esc_attr( $background_image_position );
	}
	
	if ( ! empty( $parallax_background_image ) ) {
		$image_src = wp_get_attachment_image_src( $parallax_background_image, 'full' );
		
		$grid_row_class[] = 'edgtf-parallax-row-holder';
		$grid_row_data[]  = 'data-parallax-bg-image=' . esc_url( $image_src[0] );
		
		if ( $parallax_bg_speed !== '' ) {
			$grid_row_data[] = 'data-parallax-bg-speed=' . esc_attr( $parallax_bg_speed );
		} else {
			$grid_row_data[] = 'data-parallax-bg-speed=1';
		}
		
		if ( ! empty( $parallax_bg_height ) ) {
			$grid_row_data[] = 'data-parallax-bg-height=' . esc_attr( $parallax_bg_height );
		}
	}

    if( $row_shadow === 'with-shadow') {
        $grid_row_class[] = 'edgtf-row-with-shadow';
    }
	
	if ( ! empty( $content_text_aligment ) ) {
		$grid_row_class[] = 'edgtf-content-aligment-' . esc_attr( $content_text_aligment );
	}
}

$grid_row_classes = '';
if ( ! empty( $grid_row_class ) ) {
	$grid_row_classes = implode( ' ', $grid_row_class );
}

$grid_row_datas = '';
if ( ! empty( $grid_row_data ) ) {
	$grid_row_datas = implode( ' ', $grid_row_data );
}

$edgtf_vc_row_styles = '';
if ( ! empty( $edgtf_vc_row_style ) ) {
	$edgtf_vc_row_styles = implode( ';', $edgtf_vc_row_style );
}

$edgtf_grid_row_styles = '';
if ( ! empty( $edgtf_grid_row_style ) ) {
	$edgtf_grid_row_styles = implode( ';', $edgtf_grid_row_style );
}

if ( $row_content_width === 'grid' ) {
	$edgtf_row_wrapper_start .= '<div class="edgtf-row-grid-section-wrapper ' . esc_attr( $grid_row_classes ) . '" ' . esc_attr( $grid_row_datas ) . ' ' . playerx_edge_get_inline_style( $edgtf_grid_row_styles ) . '><div class="edgtf-row-grid-section">';
	$edgtf_row_wrapper_end   .= '</div></div>';
}

if($angled_shape === 'yes'){

    $css_class[] = 'edgtf-row-has-angle-shape';
    $css_classes[] = 'edgtf-row-has-shape';

    $angle_classes = array('edgtf-angled-shape');

    if($angled_shape_direction === 'from_left_to_right'){
        $angle_classes[] = 'edgtf-angled-left-to-right';
    }

    if($angled_shape_direction === 'from_right_to_left'){
        $angle_classes[] = 'edgtf-angled-right-to-left';
    }
    switch ($angled_shape_type){
        case 'top_bottom':

            $angle_bckg_classes = array();
            $angle_classes[] = 'edgtf-angled-top-bottom';
            $angle_bckg_classes[] = 'edgtf-angled-shape-inner';

            if($angled_shape_parallax === 'yes'){
                $angle_classes[] = 'edgtf-angled-parallax';
                $angle_bckg_classes[] = 'edgtf-parallax-row-holder';
                $data_parallax = 'data-parallax-bg-speed=0.2';
            }

            $bck_image_obj = wp_get_attachment_image_src($angled_row_bck_image, 'full');
            $bck_image_url = $bck_image_obj[0];
            $bck_style = '';
            if($bck_image_url !== ''){
                $bck_style = 'background-image: url('.esc_url($bck_image_url).')';
                $data_parallax .= ' data-parallax-bg-image='.esc_url($bck_image_url);
            }

            $html = '';
            $html.= '<div class="'.implode(' ', $angle_classes ).'">';
            $html.= '<div class="'.implode(' ', $angle_bckg_classes ).'" style="'.$bck_style.'" '.$data_parallax.'></div>';
            $html.= '</div>';
            $edgtf_row_after_wrapper_open .= $html;

            break;
        case 'top':

            $angle_classes[] = 'edgtf-angled-top';
            $angle_classes[] = 'edgtf-angled-svg';
            $bck_style = '';

            if($angle_shape_bck_color != ""){
                $bck_style = 'fill:' . $angle_shape_bck_color;
            }

            $html = '';
            $html .= '<svg class="'.implode(' ',$angle_classes).'" preserveAspectRatio="none" viewBox="0 0 86 86" width="100%" height="185">';
            if($angled_shape_direction == 'from_right_to_left'){
                $html .= '<polygon points="0,0 0,86 86,86" ' . playerx_edge_get_inline_style($bck_style) . ' />';
            }
            if($angled_shape_direction == 'from_left_to_right'){
                $html .= '<polygon points="0,86 86,0 86,86" ' . playerx_edge_get_inline_style($bck_style) . ' />';
            }
            $html .= '</svg>';
            $edgtf_row_after_wrapper_open .= $html;

            break;
        case 'bottom':

            $angle_classes[] = 'edgtf-angled-bottom';
            $angle_classes[] = 'edgtf-angled-svg';
            $bck_style = '';

            if($angle_shape_bck_color != ""){
                $bck_style = 'fill:' . $angle_shape_bck_color;
            }

            $html = '';
            $html .= '<svg class="'.implode(' ',$angle_classes).'" preserveAspectRatio="none" viewBox="0 0 86 86" width="100%" height="185">';
            if($angled_shape_direction == 'from_right_to_left'){
                $html .= '<polygon points="0,0 0,86 86,0"   ' . playerx_edge_get_inline_style($bck_style) . ' />';
            }
            if($angled_shape_direction == 'from_left_to_right'){
                $html .= '<polygon points=" 0 0,86 0, 86 86 " ' . playerx_edge_get_inline_style($bck_style) . ' />';
            }
            $html .= '</svg>';
            $edgtf_row_before_wrapper_close .= $html;

            break;
    }

}

/***** Our code modification - end *****/

$css_class = preg_replace( '/\s+/', ' ', apply_filters( VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, implode( ' ', array_filter( array_unique( $css_classes ) ) ), $this->settings['base'], $atts ) );
$wrapper_attributes[] = 'class="' . esc_attr( trim( $css_class ) ) . '"';

$output .= $edgtf_row_wrapper_start;
$output .= '<div ' . implode( ' ', $wrapper_attributes ) . ' ' . playerx_edge_get_inline_style( $edgtf_vc_row_styles ) . '>';
$output .= $edgtf_row_after_wrapper_open;
$output .= wpb_js_remove_wpautop( $content );
$output .= $edgtf_row_before_wrapper_close;
$output .= '</div>';
$output .= $edgtf_row_wrapper_end;
$output .= $after_output;

echo playerx_edge_get_module_part( $output );
